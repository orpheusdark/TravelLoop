import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const createTrip = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const { title, description, startDate, endDate, travelerCount, budget, coverImage, visibility } = req.body;

  const trip = await prisma.trip.create({
    data: {
      userId,
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      travelerCount,
      budget,
      coverImage,
      visibility: visibility || 'private'
    }
  });

  res.status(201).json({ trip });
};

export const getTrips = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const trips = await prisma.trip.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { tripStops: true }
  });
  res.json({ trips });
};

export const getTrip = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const tripId = Number(req.params.id);
  const trip = await prisma.trip.findFirst({
    where: { id: tripId, userId },
    include: { tripStops: { orderBy: { orderIndex: 'asc' }, include: { activities: true } }, notes: true, packingItems: true }
  });
  if (!trip) {
    return res.status(404).json({ message: 'Trip not found' });
  }
  res.json({ trip });
};

export const updateTrip = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const tripId = Number(req.params.id);
  const { title, description, startDate, endDate, travelerCount, budget, coverImage, visibility } = req.body;

  const trip = await prisma.trip.updateMany({
    where: { id: tripId, userId },
    data: {
      title,
      description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      travelerCount,
      budget,
      coverImage,
      visibility
    }
  });

  if (trip.count === 0) {
    return res.status(404).json({ message: 'Trip not found or not owned by user' });
  }
  res.json({ message: 'Trip updated' });
};

export const deleteTrip = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const tripId = Number(req.params.id);

  await prisma.trip.deleteMany({ where: { id: tripId, userId } });
  res.status(204).end();
};

export const duplicateTrip = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const tripId = Number(req.params.id);
  const source = await prisma.trip.findFirst({ where: { id: tripId, userId }, include: { tripStops: { include: { activities: true } }, packingItems: true, notes: true } });
  if (!source) {
    return res.status(404).json({ message: 'Trip not found' });
  }

  const clone = await prisma.trip.create({
    data: {
      userId,
      title: `${source.title} Copy`,
      description: source.description,
      startDate: source.startDate,
      endDate: source.endDate,
      travelerCount: source.travelerCount,
      budget: source.budget,
      coverImage: source.coverImage,
      visibility: source.visibility,
      tripStops: {
        create: source.tripStops.map((stop) => ({
          cityId: stop.cityId,
          arrivalDate: stop.arrivalDate,
          departureDate: stop.departureDate,
          orderIndex: stop.orderIndex,
          notes: stop.notes
        }))
      },
      packingItems: {
        create: source.packingItems.map((item) => ({ title: item.title, category: item.category, packed: item.packed }))
      },
      notes: {
        create: source.notes.map((note) => ({ note: note.note }))
      }
    }
  });

  res.status(201).json({ trip: clone });
};
