var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { saveSchedule, getSchedules, getScheduleById } from '../../infrastructure/repositories/osuScheduleRepositories.js';
import { getTeamById } from '../../infrastructure/repositories/osuTeamRepositories.js';
import { Schedule } from '../../domain/models/osuSchedule.js';
import { BadRequestError } from '../errors/BadRequestError.js';
export const createSchedule = (team1Id, team2Id, date) => __awaiter(void 0, void 0, void 0, function* () {
    const team1 = yield getTeamById(team1Id);
    const team2 = yield getTeamById(team2Id);
    if (!team1) {
        throw new BadRequestError(`Team with ID ${team1Id} does not exist.`);
    }
    if (!team2) {
        throw new BadRequestError(`Team with ID ${team2Id} does not exist.`);
    }
    const schedule = new Schedule({
        team1Id: team1._id,
        team1Name: team1.name,
        team2Id: team2._id,
        team2Name: team2.name,
        date,
    });
    return yield saveSchedule(schedule);
});
export const fetchSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield getSchedules();
});
export const fetchScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield getScheduleById(id);
});
