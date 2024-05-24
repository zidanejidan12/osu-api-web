import { Router } from 'express';
import { postCreateTeam, getAllTeams, getTeamById, removeTeamById, removeMemberFromTeam, updateTeamMembersById} from '../controllers/osuTeamController';

const router = Router();

router.post('/teams', postCreateTeam);
router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.delete('/teams/:id', removeTeamById);
router.delete('/teams/:teamId/members/:userId', removeMemberFromTeam);
router.put('/teams/:id/members', updateTeamMembersById);

export default router;
