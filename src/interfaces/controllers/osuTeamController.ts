import { Request, Response } from 'express';
import { createTeam } from '../../application/services/osuTeamServices';

export const postCreateTeam = async (req: Request, res: Response) => {
  try {
    const { name, usernames } = req.body;
    if (!name || !usernames || !Array.isArray(usernames) || usernames.length < 4 || usernames.length > 6) {
      return res.status(400).json({ message: 'Invalid team data. A team must have a name and 4 to 6 members.' });
    }

    const team = await createTeam(name, usernames);
    res.status(201).json(team);
  } catch (error) {
    console.error(`Error creating team:`, error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
