var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Schedule } from '../../domain/models/osuSchedule.js';
export const saveSchedule = (scheduleData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schedule = new Schedule(scheduleData);
        return yield schedule.save();
    }
    catch (error) {
        console.error('Error saving schedule data:', error);
        throw new Error('Failed to save schedule data');
    }
});
export const getScheduleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Schedule.findById(id);
    }
    catch (error) {
        console.error('Error getting schedule data:', error);
        throw new Error('Failed to get schedule data');
    }
});
export const getSchedules = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Schedule.find({});
    }
    catch (error) {
        console.error('Error getting schedules:', error);
        throw new Error('Failed to get schedules');
    }
});
export const updateSchedule = (id, updatedSchedule) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Schedule.findByIdAndUpdate(id, updatedSchedule, { new: true });
    }
    catch (error) {
        console.error('Error updating schedule:', error);
        throw new Error('Failed to update schedule');
    }
});
