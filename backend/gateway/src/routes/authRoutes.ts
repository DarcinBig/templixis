import express from 'express';
import { requiresAuth } from 'express-openid-connect';

const router = express.Router();

router.get('/', (req, res) => {
  const isAuth = req.oidc?.isAuthenticated?.();
  res.status(200).send(isAuth ? 'Logged in' : 'Logged out');
});

router.get('/profile', requiresAuth(), (req, res) => {
  res.json({
    message: 'Profile info',
    user: req.oidc.user,
  });
});

router.get('/logout', (req, res) => {
  res.oidc.logout({ returnTo: process.env.BASE_URL });
});

export default router;
