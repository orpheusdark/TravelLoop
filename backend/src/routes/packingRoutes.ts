import { Router } from 'express';
import { addItem, deleteItem, listItems, updateItem } from '../controllers/packingController';
import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();
router.use(authenticate);

const itemSchema = z.object({
  tripId: z.number(),
  title: z.string().min(2),
  category: z.enum(['clothing', 'electronics', 'documents', 'toiletries', 'essentials']),
  packed: z.boolean().optional()
});

router.get('/', listItems);
router.post('/', validateBody(itemSchema), addItem);
router.put('/:id', validateBody(itemSchema.omit({ tripId: true })), updateItem);
router.delete('/:id', deleteItem);

export default router;
