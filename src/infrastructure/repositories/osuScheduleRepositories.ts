import { Schedule } from '../../domain/models/osuSchedule';

export const saveSchedule = async (scheduleData: any) => {
  try {
    const schedule = new Schedule(scheduleData);
    return await schedule.save();
  } catch (error) {
    console.error('Error saving schedule data:', error);
    throw new Error('Failed to save schedule data');
  }
};

export const getScheduleById = async (id: string) => {
  try {
    return await Schedule.findById(id);
  } catch (error) {
    console.error('Error getting schedule data:', error);
    throw new Error('Failed to get schedule data');
  }
};

export const getSchedules = async () => {
  try {
    return await Schedule.find({});
  } catch (error) {
    console.error('Error getting schedules:', error);
    throw new Error('Failed to get schedules');
  }
};

export const updateSchedule = async (id: string, updatedSchedule: any) => {
  try {
    return await Schedule.findByIdAndUpdate(id, updatedSchedule, { new: true });
  } catch (error) {
    console.error('Error updating schedule:', error);
    throw new Error('Failed to update schedule');
  }
};
