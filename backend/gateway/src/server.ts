import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { auth } from 'express-openid-connect';

import { rateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

import userRoutes from './routes/userRoutes';
import templateRoutes from './routes/templateRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import notificationRoutes from './routes/notificationRoutes';
import authRoutes from './routes/authRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(rateLimiter);

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET!,
  baseURL: process.env.BASE_URL!,
  clientID: process.env.AUTH0_CLIENT_ID!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!
};

app.use(auth(config));

app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/templates', templateRoutes);
app.use('/orders', orderRoutes);
app.use('/payments', paymentRoutes);
app.use('/notifications', notificationRoutes);

app.use(errorHandler);

export default app;