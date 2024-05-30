// infrastructure/repositories/osuMappoolRepositories.ts
import { Mappool, IMappool } from '../../domain/models/osuMappool';

export const saveMappool = async (mappool: IMappool) => {
  const newMappool = new Mappool(mappool);
  return await newMappool.save();
};

export const getCachedMappool = async (name: string) => {
  return await Mappool.findOne({ name });
};

export const getMappoolByName = async (name: string) => {
  return await Mappool.findOne({ name });
};
