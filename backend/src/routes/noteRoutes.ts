import { Router } from 'express';
import { addNote, deleteNote, listNotes, updateNote } from '../controllers/noteController';
import { authenticate } from '../middleware/auth';
import { validateBody } from '../middleware/validateRequest';
import { z } from 'zod';

const router = Router();
router.use(authenticate);

const noteSchema = z.object({
  tripId: z.number(),
  stopId: z.number().nullable().optional(),
  note: z.string().min(3)
});

router.get('/', listNotes);
router.post('/', validateBody(noteSchema), addNote);
router.put('/:id', validateBody(z.object({ note: z.string().min(3) })), updateNote);
router.delete('/:id', deleteNote);

export default router;
