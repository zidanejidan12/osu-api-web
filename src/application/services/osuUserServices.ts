import { getData } from '../../infrastructure/osuApi';
import { saveUserData, getUserData } from '../../infrastructure/repositories/osuUserRepositories';
import { BadRequestError } from '../errors/BadRequestError';

export const fetchAndSaveUserData = async (userId: string) => {
  try {
    if (!userId) {
      throw new BadRequestError('User ID is required');
    }
    const data = await getData(userId);
    await saveUserData(userId, data);
    return data;
  } catch (error) {
    console.error(`Error fetching and saving user data for user ${userId}:`, error);
    throw error;
  }
};

export const getOrRefreshUserData = async (userId: string) => {
  try {
    if (!userId) {
      throw new BadRequestError('User ID is required');
    }
    const user = await getUserData(userId);

    if (user) {
      const lastUpdated = new Date(user.updatedAt);
      const now = new Date();

      const hoursDiff = Math.abs(now.getTime() - lastUpdated.getTime()) / 36e5;

      if (hoursDiff > 24) {
        return await fetchAndSaveUserData(userId);
      }

      return user.data;
    }

    return await fetchAndSaveUserData(userId);
  } catch (error) {
    console.error(`Error getting or refreshing user data for user ${userId}:`, error);
    throw error;
  }
};
