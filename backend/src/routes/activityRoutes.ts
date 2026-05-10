import { Router } from 'express';
import { searchActivities } from '../controllers/activityController';

const router = Router();
router.get('/search', searchActivities);
export default router;
