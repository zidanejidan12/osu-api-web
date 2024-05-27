var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSchedule, fetchSchedules, fetchScheduleById, updateScheduleById } from '../../application/services/osuScheduleServices.js';
export const postCreateSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { team1Id, team2Id, date } = req.body;
        const schedule = yield createSchedule(team1Id, team2Id, date);
        res.status(201).json(schedule);
    }
    catch (error) {
        console.error('Error creating schedule:', error);
        res.status(500).json({ message: error.message });
    }
});
export const getSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedules = yield fetchSchedules();
        res.status(200).json(schedules);
    }
    catch (error) {
        console.error('Error fetching schedules:', error);
        res.status(500).json({ message: error.message });
    }
});
export const getScheduleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const schedule = yield fetchScheduleById(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Schedule not found' });
        }
        res.status(200).json(schedule);
    }
    catch (error) {
        console.error('Error fetching schedule by ID:', error);
        res.status(500).json({ message: error.message });
    }
});
export const putUpdateSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { team1Id, team2Id, date } = req.body;
        const updatedSchedule = yield updateScheduleById(id, team1Id, team2Id, date);
        res.status(200).json(updatedSchedule);
    }
    catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ message: error.message });
    }
});
