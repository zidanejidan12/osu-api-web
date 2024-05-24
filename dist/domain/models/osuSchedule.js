import mongoose from 'mongoose';
const { Schema } = mongoose;
const scheduleSchema = new Schema({
    team1Id: { type: String, required: true },
    team1Name: { type: String, required: true },
    team2Id: { type: String, required: true },
    team2Name: { type: String, required: true },
    date: { type: String, required: true },
});
export const Schedule = mongoose.model('Schedule', scheduleSchema);
