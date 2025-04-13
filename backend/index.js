import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import productRouter from './router/productRouter.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRouter from '../backend/router/userRouter.js';
import adminRouter from '../backend/router/adminRouter.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import financialRouter from './router/financiarRouter.js';
import fs from "fs";

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT;

// Add this middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.disable('strict routing');

app.get ('/', (req, res) => {
  res.send('Hi');
});
app.use('/api/products', productRouter);
app.use('/api/auth', userRouter);
app.use('/api/', financialRouter);
app.use('/api', adminRouter);


// Serve static files from the uploads folder
const __dirname = path.resolve();
const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});