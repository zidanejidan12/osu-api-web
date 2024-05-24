import { getData } from '../../infrastructure/osuApi';
import { getAllTeams, getTeamById, saveTeam, deleteTeam, updateTeam } from '../../infrastructure/repositories/osuTeamRepositories';
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

  // Ensure no duplicate members in the same team
  const memberIds = members.map(member => member.userId);
  if (new Set(memberIds).size !== memberIds.length) {
    throw new BadRequestError('Duplicate members found in the team.');
  }

  // Ensure no user is tied to more than one team
  const allTeams = await getAllTeams();
  const allMemberIds = allTeams.flatMap(team => team.members.map((member: { userId: any; }) => member.userId));
  for (const userId of userIds) {
    if (allMemberIds.includes(userId)) {
      throw new BadRequestError(`User with ID ${userId} is already part of another team.`);
    }
  }

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

export const deleteTeamById = async (id: string) => {
  const team = await getTeamById(id);
  if (!team) {
    throw new Error('Team not found');
  }
  await deleteTeam(id);
};

export const deleteMemberFromTeam = async (teamId: string, userId: string) => {
  const team = await getTeamById(teamId);
  if (!team) {
    throw new Error('Team not found');
  }

  const updatedMembers = team.members.filter((member: { userId: string; }) => member.userId !== userId);

  if (updatedMembers.length === team.members.length) {
    throw new Error('Member not found in the team');
  }

  team.members = updatedMembers;
  team.updatedAt = new Date();

  await updateTeam(teamId, team);
  return team;
};

export const updateTeamMembers = async (teamId: string, userIds: string[]) => {
  if (!Array.isArray(userIds) || userIds.length < 4 || userIds.length > 6) {
    throw new BadRequestError('A team must have 4 to 6 members.');
  }

  const members = await Promise.all(userIds.map(fetchUserData));

  // Ensure no duplicate members in the same team
  const memberIds = members.map(member => member.userId);
  if (new Set(memberIds).size !== memberIds.length) {
    throw new BadRequestError('Duplicate members found in the team.');
  }

  // Ensure no user is tied to more than one team
  const allTeams = await getAllTeams();
  const allMemberIds = allTeams
    .filter(team => team._id.toString() !== teamId) // Exclude the current team
    .flatMap(team => team.members.map((member: { userId: any; }) => member.userId));

  for (const userId of userIds) {
    if (allMemberIds.includes(userId)) {
      throw new BadRequestError(`User with ID ${userId} is already part of another team.`);
    }
  }

  const team = await getTeamById(teamId);
  if (!team) {
    throw new Error('Team not found');
  }

  team.members = members;
  team.updatedAt = new Date();

  await updateTeam(teamId, team);
  return team;
};
