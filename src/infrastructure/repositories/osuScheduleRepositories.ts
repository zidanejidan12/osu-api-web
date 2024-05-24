import { Schedule, ISchedule } from '../../domain/models/osuSchedule';

export const saveSchedule = async (schedule: ISchedule) => {
  return await schedule.save();
};

export const getSchedules = async (): Promise<ISchedule[]> => {
  return await Schedule.find({});
};

export const getScheduleById = async (id: number): Promise<ISchedule | null> => {
  return await Schedule.findById(id);
};
