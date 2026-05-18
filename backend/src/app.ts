import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { json } from 'body-parser';
import authRoutes from './routes/authRoutes';
import tripRoutes from './routes/tripRoutes';
import cityRoutes from './routes/cityRoutes';
import activityRoutes from './routes/activityRoutes';
import tripActivityRoutes from './routes/tripActivityRoutes';
import packingRoutes from './routes/packingRoutes';
import noteRoutes from './routes/noteRoutes';
import publicRoutes from './routes/publicRoutes';
import tripStopRoutes from './routes/tripStopRoutes';
import uploadRoutes from './routes/uploadRoutes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(json());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'traveloop-backend' }));

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/trip-stops', tripStopRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/trip-activities', tripActivityRoutes);
app.use('/api/packing', packingRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/public', publicRoutes);

app.use(errorHandler);

export default app;
