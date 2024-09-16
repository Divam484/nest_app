// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import cloudinary from '../common/cloudinary'; // Import the Cloudinary configuration

@Injectable()
export class UploadService {
  // Method to get the URL of an uploaded image from Cloudinary
  getImageUrl(publicId: string): string {
    if (!publicId) {
      throw new Error('Invalid public ID');
    }
  
    // Generate the URL using Cloudinary
    return cloudinary.url(publicId, {
      transformation: [
        { width: 500, height: 500, crop: 'limit' }, // Example transformation
      ],
    });
  }
}
