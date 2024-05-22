var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBeatmapData } from '../../infrastructure/osuApi.js';
export const getBeatmap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { beatmapId } = req.params;
        if (!beatmapId) {
            return res.status(400).json({ message: 'Beatmap ID is required' });
        }
        const beatmapData = yield getBeatmapData(beatmapId);
        res.status(200).json(beatmapData);
    }
    catch (error) {
        console.error(`Error fetching beatmap:`, error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
