// src/interfaces/routes/scheduleRoutes.ts
import { Router } from 'express';
import { postCreateSchedule, getSchedules, getScheduleById } from '../controllers/osuScheduleController';

const router = Router();

router.post('/schedules', postCreateSchedule);
router.get('/schedules', getSchedules);
router.get('/schedules/:id', getScheduleById);

export default router;
