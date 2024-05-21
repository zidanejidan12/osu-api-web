import { Request, Response } from 'express';
import { fetchAndSaveUserData, getOrRefreshUserData } from '../../application/services/osuUserServices';

export const postUserData = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = await fetchAndSaveUserData(userId);
  res.status(200).json(data);
};

export const getUserData = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = await getOrRefreshUserData(userId);
  res.status(200).json(data);
};
