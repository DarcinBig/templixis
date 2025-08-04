import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { auth } from 'express-openid-connect';

import { rateLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);

const config = {
  authRequired: false,
  secret: process.env.SESSION_SECRET! || 'your-secret-key-change-in-production',
  auth0Logout: true,
  baseURL: process.env.BASE_URL! || `http://localhost:${process.env.PORT || 3000}`,
  clientID: process.env.AUTH0_CLIENT_ID! || 'your-client-id',
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL! || 'https://your-domain.auth0.com'
};

app.use(auth(config));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ 
    message: 'Templixis Gateway API',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

app.use(errorHandler);

export default app;
