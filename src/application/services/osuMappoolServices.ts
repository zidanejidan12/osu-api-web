import { getBeatmapData } from '../../infrastructure/osuApi';
import { saveMappool, getCachedMappool } from '../../infrastructure/repositories/osuMappoolRepositories';
import { BadRequestError } from '../errors/BadRequestError';

export const fetchBeatmapData = async (beatmapId: string) => {
  const data = await getBeatmapData(beatmapId);
  return {
    beatmapId,
    data,
  };
};

export const createMappool = async (name: string, beatmapIds: string[]) => {
  if (!name || !Array.isArray(beatmapIds) || beatmapIds.length === 0) {
    throw new BadRequestError('Invalid mappool data. A mappool must have a name and at least one beatmap.');
  }

  const beatmaps = await Promise.all(beatmapIds.map(fetchBeatmapData));

  const newMappool = {
    name,
    beatmaps,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  return await saveMappool(newMappool);
};

export const getMappool = async (name: string) => {
  return await getCachedMappool(name);
};
