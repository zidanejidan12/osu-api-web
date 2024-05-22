import { getData } from '../../infrastructure/osuApi';
import { saveTeam } from '../../infrastructure/repositories/osuTeamRepositories';
import { BadRequestError } from '../errors/BadRequestError';

export const fetchUserData = async (userId: string) => {
  const data = await getData(userId);
  return {
    userId,
    data,
    updatedAt: new Date()
  };
};

export const createTeam = async (name: string, userIds: string[]) => {
  if (!name || !Array.isArray(userIds) || userIds.length < 4 || userIds.length > 6) {
    throw new BadRequestError('Invalid team data. A team must have a name and 4 to 6 members.');
  }

  const members = await Promise.all(userIds.map(fetchUserData));

  const newTeam = {
    name,
    members,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return await saveTeam(newTeam);
};
