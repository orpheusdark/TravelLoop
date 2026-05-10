import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { createTrip, deleteTrip, duplicateTrip, getTrip, getTrips, updateTrip } from '../controllers/tripController';
import { z } from 'zod';
import { validateBody } from '../middleware/validateRequest';

const router = Router();

const tripSchema = z.object({
  title: z.string().min(4),
  description: z.string().min(10),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  travelerCount: z.number().min(1),
  budget: z.number().min(0),
  coverImage: z.string().url().optional(),
  visibility: z.enum(['private', 'public']).optional()
}).refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: 'End date must be after start date',
  path: ['endDate']
});

router.use(authenticate);
router.get('/', getTrips);
router.post('/', validateBody(tripSchema), createTrip);
router.get('/:id', getTrip);
router.put('/:id', validateBody(tripSchema), updateTrip);
router.delete('/:id', deleteTrip);
router.post('/:id/duplicate', duplicateTrip);

export default router;
