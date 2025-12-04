/** @format */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import router from './routes/userRoute.js';
import protectedRoutes from './routes/protectedRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', (req, res) => {
	res.send('TaskNest Backend Running...');
});

app.use('/api/user', router);
app.use('/api/protected', protectedRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
