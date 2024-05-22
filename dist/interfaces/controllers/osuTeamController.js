var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTeam } from '../../application/services/osuTeamServices.js';
export const postCreateTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, usernames } = req.body;
        if (!name || !usernames || !Array.isArray(usernames) || usernames.length < 4 || usernames.length > 6) {
            return res.status(400).json({ message: 'Invalid team data. A team must have a name and 4 to 6 members.' });
        }
        const team = yield createTeam(name, usernames);
        res.status(201).json(team);
    }
    catch (error) {
        console.error(`Error creating team:`, error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
