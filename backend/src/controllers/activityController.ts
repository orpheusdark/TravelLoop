import { Request, Response } from 'express';
import axios from 'axios';

const otmKey = process.env.OPENTRIPMAP_API_KEY;

export const searchActivities = async (req: Request, res: Response) => {
  const query = String(req.query.q || '');
  const kinds = String(req.query.category || 'interesting_places');
  const lat = Number(req.query.lat || 0);
  const lon = Number(req.query.lon || 0);
  const radius = Number(req.query.radius || 12000);

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
    const detail = await axios.get(`https://api.opentripmap.com/0.1/en/places/xid/${xid}`, { params: { apikey: otmKey } });
    return {
      id: xid,
      title: detail.data.name || feature.properties.name,
      description: detail.data.wikipedia_extracts?.text || detail.data.info?.descr || 'Discover this engaging local experience.',
      category: feature.properties.kinds.split(',')[0] || 'sightseeing',
      estimatedCost: 15 + Math.floor(Math.random() * 70),
      duration: 1 + Math.floor(Math.random() * 4),
      rating: Math.round((detail.data.rate || 3.7) * 10) / 10,
      image: detail.data.preview?.source || `https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=60`
    };
  });

  const activities = await Promise.all(activityPromises);
  res.json({ activities });
};
