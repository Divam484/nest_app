// src/common/multer.config.ts
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from './cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    resource_type: 'auto' // Automatically detect the type of file (image or video)
  }as any,
});

export const multerConfig = {
  storage: storage,
};
