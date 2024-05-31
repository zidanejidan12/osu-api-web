var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getData } from '../../infrastructure/osuApi.js';
import { getAllTeams, getTeamById, getTeamByName, saveTeam, deleteTeam, updateTeam } from '../../infrastructure/repositories/osuTeamRepositories.js';
import { BadRequestError } from '../errors/BadRequestError.js';
export const fetchUserData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData(userId);
    return {
        userId,
        data,
        updatedAt: new Date()
    };
});
export const createTeam = (name, userIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name || !Array.isArray(userIds) || userIds.length < 4 || userIds.length > 6) {
        throw new BadRequestError('Invalid team data. A team must have a name and 4 to 6 members.');
    }
    const existingTeam = yield getTeamByName(name);
    if (existingTeam) {
        throw new BadRequestError(`A team with the name ${name} already exists.`);
    }
    const members = yield Promise.all(userIds.map(fetchUserData));
    // Ensure no duplicate members in the same team
    const memberIds = members.map(member => member.userId);
    if (new Set(memberIds).size !== memberIds.length) {
        throw new BadRequestError('Duplicate members found in the team.');
    }
    // Ensure no user is tied to more than one team
    const allTeams = yield getAllTeams();
    const allMemberIds = allTeams.flatMap(team => team.members.map((member) => member.userId));
    for (const userId of userIds) {
        if (allMemberIds.includes(userId)) {
            throw new BadRequestError(`User with ID ${userId} is already part of another team.`);
        }
    }
    const newTeam = {
        name,
        members,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    return yield saveTeam(newTeam);
});
export const fetchAllTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield getAllTeams();
});
export const fetchTeamById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield getTeamById(id);
    if (!team) {
        throw new Error('Team not found');
    }
    return team;
});
export const fetchTeamByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    if (!username) {
        throw new BadRequestError('Username is required.');
    }
    const allTeams = yield getAllTeams();
    const teamsWithUsername = allTeams.filter(team => team.members.some((member) => member.data.username === username));
    if (teamsWithUsername.length === 0) {
        throw new Error(`No teams found with a member having the username ${username}`);
    }
    return teamsWithUsername;
});
export const deleteTeamById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield getTeamById(id);
    if (!team) {
        throw new Error('Team not found');
    }
    yield deleteTeam(id);
});
export const deleteMemberFromTeam = (teamId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const team = yield getTeamById(teamId);
    if (!team) {
        throw new Error('Team not found');
    }
    const updatedMembers = team.members.filter((member) => member.userId !== userId);
    if (updatedMembers.length === team.members.length) {
        throw new Error('Member not found in the team');
    }
    team.members = updatedMembers;
    team.updatedAt = new Date();
    yield updateTeam(teamId, team);
    return team;
});
export const updateTeamMembers = (teamId, userIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(userIds) || userIds.length < 4 || userIds.length > 6) {
        throw new BadRequestError('A team must have 4 to 6 members.');
    }
    const members = yield Promise.all(userIds.map(fetchUserData));
    // Ensure no duplicate members in the same team
    const memberIds = members.map(member => member.userId);
    if (new Set(memberIds).size !== memberIds.length) {
        throw new BadRequestError('Duplicate members found in the team.');
    }
    // Ensure no user is tied to more than one team
    const allTeams = yield getAllTeams();
    const allMemberIds = allTeams
        .filter(team => team._id.toString() !== teamId) // Exclude the current team
        .flatMap(team => team.members.map((member) => member.userId));
    for (const userId of userIds) {
        if (allMemberIds.includes(userId)) {
            throw new BadRequestError(`User with ID ${userId} is already part of another team.`);
        }
    }
    const team = yield getTeamById(teamId);
    if (!team) {
        throw new Error('Team not found');
    }
    team.members = members;
    team.updatedAt = new Date();
    yield updateTeam(teamId, team);
    return team;
});
