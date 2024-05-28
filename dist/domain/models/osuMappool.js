// models/osuMappool.ts
import mongoose from 'mongoose';
const { Schema } = mongoose;
const BeatmapSchema = new Schema({
    beatmapId: { type: Number, required: true },
    difficultyRating: { type: Number, required: true },
    version: { type: String, required: true },
    accuracy: { type: Number, required: true },
    ar: { type: Number, required: true },
    bpm: { type: Number, required: true },
    cs: { type: Number, required: true },
    url: { type: String, required: true },
    artist: { type: String, required: true },
    cover: { type: String, required: true },
    creator: { type: String, required: true },
    title: { type: String, required: true },
});
const MappoolSchema = new Schema({
    name: { type: String, required: true },
    beatmaps: { type: [BeatmapSchema], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export const Mappool = mongoose.model('Mappool', MappoolSchema);
