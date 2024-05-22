import { Team } from '../../domain/models/osuTeam';

export const saveTeam = async (teamData: any) => {
  try {
    const team = new Team(teamData);
    return await team.save();
  } catch (error) {
    throw new Error('Failed to save team data');
  }
};

export const getTeamById = async (teamId: string) => {
  try {
    return await Team.findById(teamId);
  } catch (error) {
    throw new Error('Failed to get team data');
  }
};

