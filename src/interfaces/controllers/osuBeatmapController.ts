import { Request, Response } from 'express';
import { getBeatmapData } from '../../infrastructure/osuApi';

export const getBeatmap = async (req: Request, res: Response) => {
  try {
    const { beatmapId } = req.params;
    if (!beatmapId) {
      return res.status(400).json({ message: 'Beatmap ID is required' });
    }

    const beatmapData = await getBeatmapData(beatmapId);
    res.status(200).json(beatmapData);
  } catch (error) {
    console.error(`Error fetching beatmap:`, error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
