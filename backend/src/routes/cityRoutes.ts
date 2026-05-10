import { Router } from 'express';
import { getCountryList, saveCity, searchCities } from '../controllers/cityController';
import { z } from 'zod';
import { validateBody } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/search', searchCities);
router.get('/countries', getCountryList);
router.post('/', authenticate, validateBody(z.object({
  externalCityId: z.string(),
  name: z.string(),
  country: z.string(),
  latitude: z.number(),
  longitude: z.number(),
  averageCost: z.number().optional(),
  popularityScore: z.number().optional()
})), saveCity);

export default router;
