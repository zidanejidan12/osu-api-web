// src/interfaces/routes/scheduleRoutes.ts
import { Router } from 'express';
import { postCreateSchedule, getSchedules, getScheduleById, putUpdateSchedule } from '../controllers/osuScheduleController.js';
const router = Router();
router.post('/schedules', postCreateSchedule);
router.get('/schedules', getSchedules);
router.get('/schedules/:id', getScheduleById);
router.put('/schedules/:id', putUpdateSchedule);
export default router;
