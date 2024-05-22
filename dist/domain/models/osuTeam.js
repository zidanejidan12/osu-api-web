import mongoose from 'mongoose';
const { Schema } = mongoose;
const osuUserSchema = new Schema({
    userId: { type: String, required: true },
    data: { type: Object, required: true },
    updatedAt: { type: Date, default: Date.now }
});
const teamSchema = new Schema({
    name: { type: String, required: true },
    members: {
        type: [osuUserSchema],
        required: true,
        validate: [
            (val) => Array.isArray(val) && val.length >= 4 && val.length <= 6,
            'A team must have 4 to 6 members.'
        ]
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
export const Team = mongoose.model('Team', teamSchema);
