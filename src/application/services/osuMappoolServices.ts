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
    console.error('Invalid mappool data: Missing name or beatmapIds');
    throw new BadRequestError('Invalid mappool data. A mappool must have a name and at least one beatmap.');
  }

  console.log('Fetching beatmap data for IDs:', beatmapIds);

  const beatmaps = await Promise.all(beatmapIds.map(async (id) => {
    try {
      console.log(`Fetching data for beatmap ID ${id}`);
      const beatmap = await fetchBeatmapData(id);
      console.log(`Fetched beatmap data for ID ${id}:`, beatmap);

      // Validate the returned beatmap data
      if (!beatmap || !beatmap.beatmapId) {
        console.error(`Invalid beatmap data for ID ${id}:`, beatmap);
        throw new BadRequestError(`Invalid beatmap data for ID ${id}`);
      }

      return beatmap;
    } catch (error) {
      console.error(`Error fetching beatmap data for ID ${id}:`, error);
      throw error;
    }
  }));

  console.log('All beatmaps fetched:', beatmaps);

  const newMappool: IMappool = new Mappool({
    name,
    beatmaps,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  console.log('Creating new mappool:', newMappool);

  return await saveMappool(newMappool);
};

export const getMappool = async (name: string) => {
  return await getCachedMappool(name);
};
