import dotenv from 'dotenv';
import * as osu from "osu-api-v2-js"
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

export const getBeatmapData = async (beatmapId: string) => {
  try {
    const api = await createOsuApiClient();
    return await api.getBeatmap(Number(beatmapId));
  } catch (error) {
    console.error(`Error fetching beatmap data for ID ${beatmapId}:`, error);
    throw error;
  }
};