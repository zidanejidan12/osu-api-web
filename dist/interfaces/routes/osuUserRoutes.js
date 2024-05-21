import { Router } from 'express';
import { postUserData, getUserData } from '../controllers/osuUserController.js';
const router = Router();
router.post('/user/:userId', postUserData);
router.get('/user/:userId', getUserData);
export default router;
