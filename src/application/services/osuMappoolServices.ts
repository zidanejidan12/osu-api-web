// services/osuMappoolServices.ts
import { getBeatmapData } from '../../infrastructure/osuApi';
import { saveMappool, getCachedMappool } from '../../infrastructure/repositories/osuMappoolRepositories';
import { BadRequestError } from '../errors/BadRequestError';
import { Mappool, IMappool, IBeatmap } from '../../domain/models/osuMappool';

export const fetchBeatmapData = async (beatmapId: string): Promise<IBeatmap> => {
  const data = await getBeatmapData(beatmapId);
  return data;
};

export const createMappool = async (name: string, beatmapIds: string[]) => {
  if (!name || !Array.isArray(beatmapIds) || beatmapIds.length === 0) {
    throw new BadRequestError('Invalid mappool data. A mappool must have a name and at least one beatmap.');
  }

  const beatmaps = await Promise.all(beatmapIds.map(fetchBeatmapData));

  const newMappool: IMappool = new Mappool({
    name,
    beatmaps,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  return await saveMappool(newMappool);
};

export const getMappool = async (name: string) => {
  return await getCachedMappool(name);
};
