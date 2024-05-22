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
import { saveTeam } from '../../infrastructure/repositories/osuTeamRepositories.js';
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
    const members = yield Promise.all(userIds.map(fetchUserData));
    const newTeam = {
        name,
        members,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    return yield saveTeam(newTeam);
});
