import { Request, Response } from 'express';
import { fetchAndSaveUserData, getOrRefreshUserData } from '../../application/services/osuUserServices';
import { BadRequestError } from '../../application/errors/BadRequestError';

export const postUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new BadRequestError('Missing userId parameter');
    }
    const data = await fetchAndSaveUserData(userId);
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error in postUserData for user ${req.params.userId}:`, error);

    if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error', error: 'An unknown error occurred' });
    }
  }
};

export const getUserData = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      throw new BadRequestError('Missing userId parameter');
    }
    const data = await getOrRefreshUserData(userId);
    res.status(200).json(data);
  } catch (error) {
    console.error(`Error in getUserData for user ${req.params.userId}:`, error);

    if (error instanceof BadRequestError) {
      res.status(400).json({ message: error.message });
    } else if (error instanceof Error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error', error: 'An unknown error occurred' });
    }
  }
};
