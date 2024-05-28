var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// infrastructure/osuApi.ts
import dotenv from 'dotenv';
import * as osu from 'osu-api-v2-js';
dotenv.config();
export const createOsuApiClient = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield osu.API.createAsync({
        id: Number(process.env.OSU_CLIENT_ID),
        secret: process.env.OSU_CLIENT_SECRET,
    });
});
export const getData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const api = yield createOsuApiClient();
        const user = yield api.getUser(userId);
        return user;
    }
    catch (error) {
        console.error(`Error fetching data for user ${userId}:`, error);
        throw error;
    }
});
export const getBeatmapData = (beatmapId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const api = yield createOsuApiClient();
        const beatmapData = yield api.getBeatmap(Number(beatmapId));
        // Mapping function to transform the raw API response to IBeatmap
        const mapBeatmapData = (data) => {
            return {
                beatmapId: data.beatmapId,
                difficultyRating: data.difficulty_rating,
                version: data.version,
                accuracy: data.accuracy,
                ar: data.ar,
                bpm: data.bpm,
                cs: data.cs,
                url: data.url,
                artist: data.beatmapset.artist,
                cover: data.beatmapset.covers.cover,
                creator: data.beatmapset.creator,
                title: data.beatmapset.title,
            };
        };
        return mapBeatmapData(beatmapData);
    }
    catch (error) {
        console.error(`Error fetching beatmap data for ID ${beatmapId}:`, error);
        throw error;
    }
});
