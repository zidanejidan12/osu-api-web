var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createMappool, getMappool } from '../../application/services/osuMappoolServices.js';
export const postCreateMappool = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, beatmapIds } = req.body;
        if (!name || !beatmapIds || !Array.isArray(beatmapIds) || beatmapIds.length === 0) {
            return res.status(400).json({ message: 'Invalid mappool data. A mappool must have a name and at least one beatmap.' });
        }
        const mappool = yield createMappool(name, beatmapIds);
        res.status(201).json(mappool);
    }
    catch (error) {
        console.error('Error creating mappool:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
export const getMappoolData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.params;
        const mappool = yield getMappool(name);
        if (!mappool) {
            return res.status(404).json({ message: 'Mappool not found' });
        }
        res.status(200).json(mappool);
    }
    catch (error) {
        console.error('Error fetching mappool:', error);
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
        else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
});
