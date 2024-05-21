import dotenv from 'dotenv';
dotenv.config();

export const createOsuApiClient = async () => {
  const osu = await import('osu-api-v2-js');
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
