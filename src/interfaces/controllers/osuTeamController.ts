import { Request, Response } from 'express';
import { createTeam, fetchAllTeams, fetchTeamById, deleteTeamById, deleteMemberFromTeam, updateTeamMembers } from '../../application/services/osuTeamServices';

export const postCreateTeam = async (req: Request, res: Response) => {
  try {
    const { name, userIds } = req.body;
    const team = await createTeam(name, userIds);
    res.status(201).json(team);
  } catch (error: any) { // Specify the type of error as 'any'
    console.error(`Error creating team:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getAllTeams = async (req: Request, res: Response) => {
  try {
    const teams = await fetchAllTeams();
    res.status(200).json(teams);
  } catch (error: any) { // Specify the type of error as 'any'
    console.error(`Error fetching teams:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await fetchTeamById(id);
    if (!team) {
      res.status(404).json({ message: 'Team not found' });
    } else {
      res.status(200).json(team);
    }
  } catch (error: any) { // Specify the type of error as 'any'
    console.error(`Error fetching team by ID:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const removeTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteTeamById(id);
    res.status(204).end();
  } catch (error: any) { // Specify the type of error as 'any'
    console.error(`Error deleting team by ID:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const removeMemberFromTeam = async (req: Request, res: Response) => {
  try {
    const { teamId, userId } = req.params;
    await deleteMemberFromTeam(teamId, userId);
    res.status(204).end();
  } catch (error: any) { // Specify the type of error as 'any'
    console.error(`Error removing member from team:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

export const updateTeamMembersById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userIds } = req.body;
    const team = await updateTeamMembers(id, userIds);
    res.status(200).json(team);
  } catch (error: any) { // Specify the type of error as 'any'
    console.error(`Error updating team members:`, error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
