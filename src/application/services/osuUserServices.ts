import { getData } from '../../infrastructure/osuApi';
import { saveUserData, getUserData } from '../../infrastructure/repositories/osuUserRepositories';

export const fetchAndSaveUserData = async (userId: string) => {
  const data = await getData(userId);
  await saveUserData(userId, data);
  return data;
};

export const getOrRefreshUserData = async (userId: string) => {
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
};
