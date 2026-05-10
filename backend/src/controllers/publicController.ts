import { Request, Response } from 'express';
import prisma from '../prisma';

export const getPublicTrip = async (req: Request, res: Response) => {
  const shareId = req.params.shareId;
  const trip = await prisma.trip.findFirst({
    where: { shareId, visibility: 'public' },
    include: { tripStops: { orderBy: { orderIndex: 'asc' }, include: { activities: true } }, notes: true, packingItems: true }
  });
  if (!trip) {
    return res.status(404).json({ message: 'Shared itinerary not found' });
  }
  res.json({ trip });
};
