import { Request, Response } from 'express';
import axios from 'axios';
import prisma from '../prisma';

const otmKey = process.env.OPENTRIPMAP_API_KEY;

const fallbackActivities = [
  { id: 'fallback-1', title: 'Sunrise food tour', description: 'Start your day with local pastries, espresso, and hidden neighborhood spots.', category: 'food', estimatedCost: 28, duration: 3, rating: 4.8, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80' },
  { id: 'fallback-2', title: 'Museum evening pass', description: 'Explore a curated museum route with late-hour access and architectural highlights.', category: 'museums', estimatedCost: 22, duration: 2, rating: 4.6, image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80' },
  { id: 'fallback-3', title: 'Riverside skyline walk', description: 'A scenic walk with panoramic views and flexible photo stops.', category: 'sightseeing', estimatedCost: 0, duration: 2, rating: 4.9, image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80' },
  { id: 'fallback-4', title: 'Night market crawl', description: 'Taste local snacks and discover lively night energy after sunset.', category: 'nightlife', estimatedCost: 35, duration: 4, rating: 4.7, image: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=900&q=80' },
  { id: 'fallback-5', title: 'Nature reset hike', description: 'A relaxed outdoor route with clean air, viewpoints, and a slow travel pace.', category: 'nature', estimatedCost: 12, duration: 4, rating: 4.9, image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80' }
];

export const searchActivities = async (req: Request, res: Response) => {
  const kinds = String(req.query.category || 'sightseeing');
  const lat = Number(req.query.lat || 0);
  const lon = Number(req.query.lon || 0);
  const radius = Number(req.query.radius || 12000);

  let activities: any[] = [];

  if (otmKey) {
    try {
      const listResponse = await axios.get('https://api.opentripmap.com/0.1/en/places/radius', {
        params: {
          apikey: otmKey,
          radius,
          lon,
          lat,
          kinds,
          limit: 25,
          rate: 2
        }
      });

      const activityPromises = listResponse.data.features.slice(0, 16).map(async (feature: any) => {
        const xid = feature.properties.xid;
        const detail = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${xid}`, { params: { apikey: otmKey } }).then((response) => response.data).catch(() => null);
        return {
          id: xid,
          title: detail?.name || feature.properties.name,
          description: detail?.wikipedia_extracts?.text || detail?.info?.descr || 'Discover this engaging local experience.',
          category: feature.properties.kinds.split(',')[0] || 'sightseeing',
          estimatedCost: 15 + Math.floor(Math.random() * 70),
          duration: 1 + Math.floor(Math.random() * 4),
          rating: Math.round(((detail?.rate || 3.7) as number) * 10) / 10,
          image: detail?.preview?.source || `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=60`
        };
      });

      activities = await Promise.all(activityPromises);
    } catch (_error) {
      activities = [];
    }
  }

  if (!activities.length) {
    const persisted = await prisma.activity.findMany({
      where: kinds ? { category: { contains: kinds } } : undefined,
      take: 16,
      orderBy: [{ estimatedCost: 'asc' }, { id: 'asc' }]
    });

    activities = persisted.length
      ? persisted.map((activity) => ({
          id: activity.id,
          title: activity.title,
          description: activity.description,
          category: activity.category,
          estimatedCost: activity.estimatedCost,
          duration: activity.duration,
          rating: 4.7,
          image: activity.image || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=60'
        }))
      : fallbackActivities.filter((activity) => activity.category === kinds || kinds === 'sightseeing');
  }

  res.json({ activities });
};
