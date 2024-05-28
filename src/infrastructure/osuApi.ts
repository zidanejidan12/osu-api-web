// infrastructure/osuApi.ts
import dotenv from 'dotenv';
import * as osu from 'osu-api-v2-js';
import { IBeatmap } from '../domain/models/osuMappool';
dotenv.config();

export const createOsuApiClient = async () => {
  return await osu.API.createAsync({
    id: Number(process.env.OSU_CLIENT_ID!),
    secret: process.env.OSU_CLIENT_SECRET!,
  });
};

export const getData = async (userId: string) => {
  try {
    const api = await createOsuApiClient();
    const user = await api.getUser(userId);
    return user;
  } catch (error) {
    console.error(`Error fetching data for user ${userId}:`, error);
    throw error;
  }
};

export const getBeatmapData = async (beatmapId: string): Promise<IBeatmap> => {
  try {
    const api = await createOsuApiClient();
    const beatmapData = await api.getBeatmap(Number(beatmapId));
    
    // Mapping function to transform the raw API response to IBeatmap
    const mapBeatmapData = (data: any): IBeatmap => {
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
  } catch (error) {
    console.error(`Error fetching beatmap data for ID ${beatmapId}:`, error);
    throw error;
  }
};
