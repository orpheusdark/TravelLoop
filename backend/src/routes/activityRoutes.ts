import { Router } from 'express';
import { searchActivities, getActivity } from '../controllers/activityController';

const router = Router();
router.get('/search', searchActivities);
router.get('/:id', getActivity);
export default router;
