import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const addStop = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const { tripId, cityId, cityName, arrivalDate, departureDate, orderIndex, notes } = req.body;

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip || trip.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized trip' });
  }

  const stop = await prisma.tripStop.create({
    data: { tripId, cityId: cityId || null, cityName: cityName || null, arrivalDate: new Date(arrivalDate), departureDate: new Date(departureDate), orderIndex, notes }
  });
  res.status(201).json({ stop });
};

export const updateStop = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const stopId = Number(req.params.id);
  const { arrivalDate, departureDate, orderIndex, notes, cityName } = req.body;

  const stop = await prisma.tripStop.findUnique({ where: { id: stopId }, include: { trip: true } });
  if (!stop || stop.trip.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized stop' });
  }

  const updated = await prisma.tripStop.update({
    where: { id: stopId },
    data: { arrivalDate: new Date(arrivalDate), departureDate: new Date(departureDate), orderIndex, notes, cityName: cityName || stop.cityName }
  });
  res.json({ stop: updated });
};

export const reorderStops = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const { orders } = req.body;

  const updates = orders.map((entry: { id: number; orderIndex: number }) => prisma.tripStop.update({ where: { id: entry.id }, data: { orderIndex: entry.orderIndex } }));
  await Promise.all(updates);
  res.json({ message: 'Stops reordered' });
};

export const removeStop = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const stopId = Number(req.params.id);
  const stop = await prisma.tripStop.findUnique({ where: { id: stopId }, include: { trip: true } });
  if (!stop || stop.trip.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  await prisma.tripStop.delete({ where: { id: stopId } });
  res.status(204).end();
};
