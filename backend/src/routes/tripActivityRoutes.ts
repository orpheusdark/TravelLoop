import { Router } from 'express';
import { addTripActivity } from '../controllers/tripActivityController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);
router.post('/', addTripActivity);

export default router;
