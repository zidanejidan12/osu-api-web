import express from 'express';
import dotenv from 'dotenv';
import connectDB from './infrastructure/databases/mongoDb.js';
import osuUserRoutes from './interfaces/routes/osuUserRoutes.js';
import osuTeamRoutes from './interfaces/routes/osuTeamRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8086;
// Connect to MongoDB
connectDB()
    .then(() => {
    console.log('MongoDB connected');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
// Middleware
app.use(express.json());
// Routes
app.use('/api', osuUserRoutes);
app.use('/api', osuTeamRoutes);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
