import { Request, Response } from 'express';
import { uploadImage } from '../services/cloudinary';

export const uploadCover = async (req: Request, res: Response) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ message: 'Image data is required' });
  }

  const url = await uploadImage(image);
  res.json({ url });
};
