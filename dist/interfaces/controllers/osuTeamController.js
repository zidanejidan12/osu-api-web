var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTeam, fetchAllTeams, fetchTeamById, deleteTeamById, deleteMemberFromTeam, updateTeamMembers } from '../../application/services/osuTeamServices.js';
import { BadRequestError } from '../../application/errors/BadRequestError.js';
export const postCreateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, userIds } = req.body;
        const team = yield createTeam(name, userIds);
        res.status(201).json(team);
    }
    catch (error) {
        console.error(`Error creating team:`, error);
        if (error instanceof BadRequestError) {
            res.status(400).json({ message: 'Bad Request', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }
});
export const getAllTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teams = yield fetchAllTeams();
        res.status(200).json(teams);
    }
    catch (error) {
        console.error(`Error fetching teams:`, error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
export const getTeamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const team = yield fetchTeamById(id);
        if (!team) {
            res.status(404).json({ message: 'Team not found' });
        }
        else {
            res.status(200).json(team);
        }
    }
    catch (error) {
        console.error(`Error fetching team by ID:`, error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
export const removeTeamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield deleteTeamById(id);
        res.status(204).end();
    }
    catch (error) {
        console.error(`Error deleting team by ID:`, error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
export const removeMemberFromTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { teamId, userId } = req.params;
        yield deleteMemberFromTeam(teamId, userId);
        res.status(204).end();
    }
    catch (error) {
        console.error(`Error removing member from team:`, error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
export const updateTeamMembersById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { userIds } = req.body;
        const team = yield updateTeamMembers(id, userIds);
        res.status(200).json(team);
    }
    catch (error) {
        console.error(`Error updating team members:`, error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});
