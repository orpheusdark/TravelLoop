import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const listNotes = async (req: AuthRequest, res: Response) => {
  const tripId = Number(req.query.tripId);
  const notes = await prisma.tripNote.findMany({ where: { tripId }, orderBy: { createdAt: 'desc' } });
  res.json({ notes });
};

export const addNote = async (req: AuthRequest, res: Response) => {
  const { tripId, stopId, note } = req.body;
  const created = await prisma.tripNote.create({ data: { tripId, stopId: stopId || null, note } });
  res.status(201).json({ note: created });
};

export const updateNote = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const { note } = req.body;
  const updated = await prisma.tripNote.update({ where: { id }, data: { note } });
  res.json({ note: updated });
};

export const deleteNote = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  await prisma.tripNote.delete({ where: { id } });
  res.status(204).end();
};
