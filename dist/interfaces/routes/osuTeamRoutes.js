import { Router } from 'express';
import { postCreateTeam, getAllTeams, getTeamById } from '../controllers/osuTeamController.js';
const router = Router();
router.post('/teams', postCreateTeam);
router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
export default router;
