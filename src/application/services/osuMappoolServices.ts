// services/osuMappoolServices.ts

import { getBeatmapData } from '../../infrastructure/osuApi';
import { saveMappool, getCachedMappool, getMappoolByName } from '../../infrastructure/repositories/osuMappoolRepositories';
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

  // Check for duplicate mappool name
  const existingMappool = await getMappoolByName(name);
  if (existingMappool) {
    console.error(`Mappool with name "${name}" already exists`);
    throw new BadRequestError(`Mappool with name "${name}" already exists`);
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
  const mappool = await getCachedMappool(name);

  if (!mappool) {
    throw new BadRequestError('Mappool not found');
  }

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  if (mappool.updatedAt < oneWeekAgo) {
    console.log(`Refreshing beatmap data for mappool "${name}"`);

    const updatedBeatmaps = await Promise.all(mappool.beatmaps.map(async (beatmap) => {
      try {
        const updatedBeatmap = await fetchBeatmapData(beatmap.beatmapId.toString());
        console.log(`Fetched updated beatmap data for ID ${beatmap.beatmapId}:`, updatedBeatmap);
        return updatedBeatmap;
      } catch (error) {
        console.error(`Error fetching updated beatmap data for ID ${beatmap.beatmapId}:`, error);
        return beatmap;
      }
    }));

    mappool.beatmaps = updatedBeatmaps;
    mappool.updatedAt = new Date();
    await mappool.save();
  }

  return mappool;
};
