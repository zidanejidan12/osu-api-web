import { Team } from '../../domain/models/osuTeam';

export const saveTeam = async (teamData: any): Promise<any> => {
  try {
    const team = new Team(teamData);
    return await team.save();
  } catch (error) {
    console.error('Error saving team data:', error);
    throw new Error('Failed to save team data');
  }
};

export const getTeamById = async (teamId: string): Promise<any | null> => {
  try {
    return await Team.findById(teamId);
  } catch (error) {
    console.error('Error getting team data:', error);
    throw new Error('Failed to get team data');
  }
};

export const getAllTeams = async (): Promise<any[]> => {
  try {
    return await Team.find({});
  } catch (error) {
    console.error('Error getting teams:', error);
    throw new Error('Failed to get teams');
  }
};

export const deleteTeam = async (teamId: string): Promise<void> => {
  try {
    await Team.findByIdAndDelete(teamId);
  } catch (error) {
    console.error('Error deleting team:', error);
    throw new Error('Failed to delete team');
  }
};

export const updateTeam = async (teamId: string, updatedTeam: any): Promise<any | null> => {
  try {
    return await Team.findByIdAndUpdate(teamId, updatedTeam, { new: true });
  } catch (error) {
    console.error('Error updating team:', error);
    throw new Error('Failed to update team');
  }
};

export const getTeamByName = async (name: string): Promise<any | null> => {
  try {
    return await Team.findOne({ name });
  } catch (error) {
    console.error('Error getting team by name:', error);
    throw new Error('Failed to get team by name');
  }
};