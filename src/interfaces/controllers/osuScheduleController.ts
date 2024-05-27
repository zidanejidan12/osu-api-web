import { Request, Response } from 'express';
import { createSchedule, fetchSchedules, fetchScheduleById, updateScheduleById } from '../../application/services/osuScheduleServices';

export const postCreateSchedule = async (req: Request, res: Response) => {
  try {
    const { team1Id, team2Id, date } = req.body;
    const schedule = await createSchedule(team1Id, team2Id, date);
    res.status(201).json(schedule);
  } catch (error: any) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await fetchSchedules();
    res.status(200).json(schedules);
  } catch (error: any) {
    console.error('Error fetching schedules:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getScheduleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const schedule = await fetchScheduleById(id);
    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }
    res.status(200).json(schedule);
  } catch (error: any) {
    console.error('Error fetching schedule by ID:', error);
    res.status(500).json({ message: error.message });
  }
};

export const putUpdateSchedule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { team1Id, team2Id, date } = req.body;
    const updatedSchedule = await updateScheduleById(id, team1Id, team2Id, date);
    res.status(200).json(updatedSchedule);
  } catch (error: any) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ message: error.message });
  }
};
