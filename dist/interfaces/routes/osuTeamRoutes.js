import { Router } from 'express';
import { postCreateTeam } from '../controllers/osuTeamController.js';
const router = Router();
router.post('/teams', postCreateTeam);
export default router;
