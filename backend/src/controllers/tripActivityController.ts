import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const addTripActivity = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const { stopId, activity, selectedDate } = req.body;

  if (!stopId || !activity) {
    return res.status(400).json({ message: 'stopId and activity are required' });
  }

  const stop = await prisma.tripStop.findUnique({ where: { id: Number(stopId) }, include: { trip: true } });
  if (!stop || stop.trip.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized stop' });
  }

  // Create activity record
  const createdActivity = await prisma.activity.create({
    data: {
      cityId: activity.cityId || null,
      title: activity.title,
      description: activity.description || '',
      category: activity.category || 'sightseeing',
      estimatedCost: Number(activity.estimatedCost || 0),
      duration: Number(activity.duration || 1),
      image: activity.image || null
    }
  });

  const tripActivity = await prisma.tripActivity.create({
    data: {
      stopId: stop.id,
      activityId: createdActivity.id,
      selectedDate: selectedDate ? new Date(selectedDate) : new Date()
    },
    include: { activity: true }
  });

  res.status(201).json({ tripActivity });
};

export default {};

export const addActivityToTrip = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const tripId = Number(req.params.tripId || req.params.id || req.params.id);
  const { activity, selectedDate } = req.body;

  if (!activity) {
    return res.status(400).json({ message: 'activity is required' });
  }

  const trip = await prisma.trip.findUnique({ where: { id: tripId }, include: { tripStops: true } });
  if (!trip || trip.userId !== userId) {
    return res.status(403).json({ message: 'Unauthorized trip' });
  }

  // Choose existing stop or create one if none
  let stopId: number;
  if (trip.tripStops && trip.tripStops.length > 0) {
    stopId = trip.tripStops[0].id;
  } else {
    const newStop = await prisma.tripStop.create({
      data: {
        tripId: trip.id,
        cityId: activity.cityId || null,
        cityName: activity.cityName || null,
        arrivalDate: trip.startDate,
        departureDate: trip.startDate,
        orderIndex: 0
      }
    });
    stopId = newStop.id;
  }

  // create activity and link
  const createdActivity = await prisma.activity.create({
    data: {
      cityId: activity.cityId || null,
      title: activity.title,
      description: activity.description || '',
      category: activity.category || 'sightseeing',
      estimatedCost: Number(activity.estimatedCost || 0),
      duration: Number(activity.duration || 1),
      image: activity.image || null
    }
  });

  const tripActivity = await prisma.tripActivity.create({
    data: {
      stopId,
      activityId: createdActivity.id,
      selectedDate: selectedDate ? new Date(selectedDate) : new Date()
    },
    include: { activity: true }
  });

  res.status(201).json({ tripActivity });
};
