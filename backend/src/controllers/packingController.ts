import { Request, Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middleware/auth';

export const listItems = async (req: AuthRequest, res: Response) => {
  const userId = req.userId!;
  const tripId = Number(req.query.tripId);
  const items = await prisma.packingItem.findMany({ where: { tripId } });
  res.json({ items });
};

export const addItem = async (req: AuthRequest, res: Response) => {
  const { tripId, title, category } = req.body;
  const item = await prisma.packingItem.create({ data: { tripId, title, category, packed: false } });
  res.status(201).json({ item });
};

export const updateItem = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  const { title, category, packed } = req.body;
  const item = await prisma.packingItem.update({ where: { id }, data: { title, category, packed } });
  res.json({ item });
};

export const deleteItem = async (req: AuthRequest, res: Response) => {
  const id = Number(req.params.id);
  await prisma.packingItem.delete({ where: { id } });
  res.status(204).end();
};
