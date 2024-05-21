import mongoose from 'mongoose';
const osuUserSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    data: { type: Object, required: true },
    updatedAt: { type: Date, default: Date.now },
});
export const OsuUser = mongoose.model('OsuUser', osuUserSchema);
