var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// services/osuMappoolServices.ts
import { getBeatmapData } from '../../infrastructure/osuApi.js';
import { saveMappool, getCachedMappool } from '../../infrastructure/repositories/osuMappoolRepositories.js';
import { BadRequestError } from '../errors/BadRequestError.js';
import { Mappool } from '../../domain/models/osuMappool.js';
export const fetchBeatmapData = (beatmapId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getBeatmapData(beatmapId);
    return data;
});
export const createMappool = (name, beatmapIds) => __awaiter(void 0, void 0, void 0, function* () {
    if (!name || !Array.isArray(beatmapIds) || beatmapIds.length === 0) {
        throw new BadRequestError('Invalid mappool data. A mappool must have a name and at least one beatmap.');
    }
    const beatmaps = yield Promise.all(beatmapIds.map(fetchBeatmapData));
    const newMappool = new Mappool({
        name,
        beatmaps,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    return yield saveMappool(newMappool);
});
export const getMappool = (name) => __awaiter(void 0, void 0, void 0, function* () {
    return yield getCachedMappool(name);
});
