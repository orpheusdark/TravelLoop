import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadImage = async (imageData: string) => {
  const uploaded = await cloudinary.uploader.upload(imageData, { folder: 'traveloop' });
  return uploaded.secure_url;
};
