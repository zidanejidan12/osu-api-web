import { Request, Response } from 'express';
import { createSchedule, fetchSchedules, fetchScheduleById } from '../../application/services/osuScheduleServices';
import { BadRequestError } from '../../application/errors/BadRequestError';

export const postCreateSchedule = async (req: Request, res: Response) => {
  try {
    const { team1Id, team2Id, date } = req.body;

    if (!team1Id || !team2Id || !date) {
      return res.status(400).json({ message: 'Missing required fields: team1Id, team2Id, and date are required.' });
    }

    const schedule = await createSchedule(team1Id, team2Id, date);
    res.status(201).json(schedule);
  } catch (error) {
    console.error(`Error creating schedule:`, error);
    if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
    }
  }
};

export const getSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await fetchSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    console.error(`Error fetching schedules:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};

export const getScheduleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const schedule = await fetchScheduleById(Number(id));

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json(schedule);
  } catch (error) {
    console.error(`Error fetching schedule by ID:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
