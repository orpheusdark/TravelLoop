import { Router } from 'express';
import { uploadCover } from '../controllers/uploadController';
import { authenticate } from '../middleware/auth';
import { z } from 'zod';
import { validateBody } from '../middleware/validateRequest';

const router = Router();

const uploadSchema = z.object({ image: z.string().min(20) });

router.post('/cover', authenticate, validateBody(uploadSchema), uploadCover);

export default router;
