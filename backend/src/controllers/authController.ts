import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma';

const jwtSecret = process.env.JWT_SECRET || 'traveloop-secret';
const jwtExpiry = '7d';

const createToken = (userId: number) => jwt.sign({ userId }, jwtSecret, { expiresIn: jwtExpiry });

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, avatar: null }
  });

  const token = createToken(user.id);
  res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar }, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = createToken(user.id);
  res.json({ user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar }, token });
};

export const profile = async (req: Request, res: Response) => {
  const userId = Number((req as any).userId);
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user: { id: user.id, name: user.name, email: user.email, avatar: user.avatar } });
};
