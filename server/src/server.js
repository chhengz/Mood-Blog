import dotenv from 'dotenv';
dotenv.config();

import cookieParser from "cookie-parser";
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';

import router from './routes/routes.js';
import { startServer } from './config/message.config.js';
import { rateLimiter } from './middleware/ratelimiter.middleware.js';

const app = express();
const allowedOrigins = process.env.CORE_ORIGIN.split(",");


// Security middleware
app.use(helmet());
app.use(rateLimiter);
// app.use(cors({
//     origin: process.env.CORE_ORIGIN,
//     credentials: true,
// }));
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


// Body parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
const logger = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(logger));

// Routes
app.use(router);

// Connection
startServer(app, {angkorLog: process.env.NODE_ENV === 'production'});

// console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - IP: ${req.ip}`);