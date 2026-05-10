import { Router } from 'express';
import { addStop, reorderStops, removeStop, updateStop } from '../controllers/tripStopController';
import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();

const stopSchema = z.object({
  tripId: z.number(),
  cityId: z.number(),
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  orderIndex: z.number().min(0),
  notes: z.string().optional()
});

const reorderSchema = z.object({
  orders: z.array(z.object({ id: z.number(), orderIndex: z.number() }))
});

router.use(authenticate);
router.post('/', validateBody(stopSchema), addStop);
router.put('/:id', validateBody(stopSchema.omit({ tripId: true })), updateStop);
router.patch('/reorder', validateBody(reorderSchema), reorderStops);
router.delete('/:id', removeStop);

export default router;
