import { Router } from 'express';
import { login, register, profile } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { z } from 'zod';
import { validateBody } from '../middleware/validateRequest';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);
router.get('/profile', authenticate, profile);

export default router;
