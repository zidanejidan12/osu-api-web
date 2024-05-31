var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Team } from '../../domain/models/osuTeam.js';
export const saveTeam = (teamData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const team = new Team(teamData);
        return yield team.save();
    }
    catch (error) {
        console.error('Error saving team data:', error);
        throw new Error('Failed to save team data');
    }
});
export const getTeamById = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Team.findById(teamId);
    }
    catch (error) {
        console.error('Error getting team data:', error);
        throw new Error('Failed to get team data');
    }
});
export const getAllTeams = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Team.find({});
    }
    catch (error) {
        console.error('Error getting teams:', error);
        throw new Error('Failed to get teams');
    }
});
export const deleteTeam = (teamId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Team.findByIdAndDelete(teamId);
    }
    catch (error) {
        console.error('Error deleting team:', error);
        throw new Error('Failed to delete team');
    }
});
export const updateTeam = (teamId, updatedTeam) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Team.findByIdAndUpdate(teamId, updatedTeam, { new: true });
    }
    catch (error) {
        console.error('Error updating team:', error);
        throw new Error('Failed to update team');
    }
});
export const getTeamByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Team.findOne({ name });
    }
    catch (error) {
        console.error('Error getting team by name:', error);
        throw new Error('Failed to get team by name');
    }
});
