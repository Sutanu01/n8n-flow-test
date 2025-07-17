import express from 'express';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

const SCREEN_MAP = {
  Admin: [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Users', path: '/users' },
    { name: 'Settings', path: '/settings' },
    { name: 'SupportTicketsApp', path: '/support' }
  ],
  User: [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Profile', path: '/profile' },
  ]
};


router.get('/me/screens', authenticate, (req, res) => {
  const role = req.user.role;

  if (!role || !SCREEN_MAP[role]) {
    return res.status(403).json({ error: 'Unauthorized or unknown role' });
  }

  const screens = SCREEN_MAP[role];
  res.json({ screens });
});

export default router;
