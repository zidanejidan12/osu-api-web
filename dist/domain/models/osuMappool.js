import mongoose from 'mongoose';
const { Schema } = mongoose;
const BeatmapSchema = new Schema({
    beatmapId: { type: String, required: true },
    data: { type: Object, required: true },
});
const MappoolSchema = new Schema({
    name: { type: String, required: true },
    beatmaps: { type: [BeatmapSchema], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Mappool = mongoose.model('Mappool', MappoolSchema);
