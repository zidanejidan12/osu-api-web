import mongoose, { Schema, Document } from 'mongoose';

interface IBeatmap {
  beatmapId: string;
  data: object;
}

interface IMappool extends Document {
  name: string;
  beatmaps: IBeatmap[];
  createdAt: Date;
  updatedAt: Date;
}

const BeatmapSchema = new Schema<IBeatmap>({
  beatmapId: { type: String, required: true },
  data: { type: Object, required: true },
});

const MappoolSchema = new Schema<IMappool>({
  name: { type: String, required: true },
  beatmaps: { type: [BeatmapSchema], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Mappool = mongoose.model<IMappool>('Mappool', MappoolSchema);
