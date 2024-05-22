import { Router } from 'express';
import { postCreateMappool, getMappoolData } from '../controllers/osuMappoolController.js';
const router = Router();
router.post('/mappool', postCreateMappool);
router.get('/mappool/:name', getMappoolData);
export default router;
