import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { userRouter } from './routes/users.js';
import { savedExerciseRouter } from './routes/myExercises.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/auth", userRouter);
app.use("/myExercises", savedExerciseRouter)

mongoose.connect(process.env.MONGO_CONNECTION_KEY);
 
app.listen(3001, () => console.log('server started on port 3001'));