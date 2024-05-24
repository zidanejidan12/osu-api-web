import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface ISchedule extends mongoose.Document {
  team1Id: string;
  team1Name: string;
  team2Id: string;
  team2Name: string;
  date: string;
}

const scheduleSchema = new Schema({
  team1Id: { type: String, required: true },
  team1Name: { type: String, required: true },
  team2Id: { type: String, required: true },
  team2Name: { type: String, required: true },
  date: { type: String, required: true },
});

export const Schedule = mongoose.model<ISchedule>('Schedule', scheduleSchema);
