import express from 'express';
import axios from 'axios'
import { requiresAuth } from 'express-openid-connect';
import { SERVICE_URLS } from '../config/serviceUrls';

const router = express.Router();

router.get('/', requiresAuth(), async (req, res, next) => {
  try {
    const response = await axios.get(`${SERVICE_URLS.user}/users`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', requiresAuth(), async (req, res, next) => {
  try {
    const response = await axios.get(`${SERVICE_URLS.user}/users/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

export default router;