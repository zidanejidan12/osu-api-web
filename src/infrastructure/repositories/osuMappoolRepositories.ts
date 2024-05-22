import { Mappool } from '../../domain/models/osuMappool';

export const saveMappool = async (mappool: any) => {
  const newMappool = new Mappool(mappool);
  return await newMappool.save();
};

export const getCachedMappool = async (name: string) => {
  return await Mappool.findOne({ name });
};
