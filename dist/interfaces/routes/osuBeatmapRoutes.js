import { Router } from 'express';
import { getBeatmap } from '../../interfaces/controllers/osuBeatmapController.js';
const router = Router();
router.get('/beatmaps/:beatmapId', getBeatmap);
export default router;
