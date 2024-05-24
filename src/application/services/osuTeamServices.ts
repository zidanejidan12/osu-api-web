import { getData } from '../../infrastructure/osuApi';
import { getAllTeams, getTeamById, saveTeam } from '../../infrastructure/repositories/osuTeamRepositories';
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

export const fetchAllTeams = async () => {
  return await getAllTeams();
};

export const fetchTeamById = async (id: string) => {
  const team = await getTeamById(id);
  if (!team) {
    throw new Error('Team not found');
  }
  return team;
};

