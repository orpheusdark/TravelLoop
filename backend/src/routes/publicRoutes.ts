import { Router } from 'express';
import { getPublicTrip } from '../controllers/publicController';

const router = Router();
router.get('/:shareId', getPublicTrip);
export default router;
