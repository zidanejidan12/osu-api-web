var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSchedule, fetchSchedules, fetchScheduleById } from '../../application/services/osuScheduleServices.js';
import { BadRequestError } from '../../application/errors/BadRequestError.js';
export const postCreateSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { team1Id, team2Id, date } = req.body;
        if (!team1Id || !team2Id || !date) {
            return res.status(400).json({ message: 'Missing required fields: team1Id, team2Id, and date are required.' });
        }
        const schedule = yield createSchedule(team1Id, team2Id, date);
        res.status(201).json(schedule);
    }
    catch (error) {
        console.error(`Error creating schedule:`, error);
        if (error instanceof BadRequestError) {
            res.status(400).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
});
export const getSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield fetchSchedules();
        res.status(200).json(schedules);
    }
    catch (error) {
        console.error(`Error fetching schedules:`, error);
        res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
export const getScheduleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const schedule = yield fetchScheduleById(Number(id));
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    }
    catch (error) {
        console.error(`Error fetching schedule by ID:`, error);
        res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
});
