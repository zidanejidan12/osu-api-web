import { Request, Response } from 'express';
import { createMappool, getMappool } from '../../application/services/osuMappoolServices';

export const postCreateMappool = async (req: Request, res: Response) => {
  try {
    const { name, beatmapIds } = req.body;
    if (!name || !beatmapIds || !Array.isArray(beatmapIds) || beatmapIds.length === 0) {
      return res.status(400).json({ message: 'Invalid mappool data. A mappool must have a name and at least one beatmap.' });
    }

    const mappool = await createMappool(name, beatmapIds);
    res.status(201).json(mappool);
  } catch (error) {
    console.error('Error creating mappool:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export const getMappoolData = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const mappool = await getMappool(name);
    if (!mappool) {
      return res.status(404).json({ message: 'Mappool not found' });
    }
    res.status(200).json(mappool);
  } catch (error) {
    console.error('Error fetching mappool:', error);
    if (error instanceof Error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};
