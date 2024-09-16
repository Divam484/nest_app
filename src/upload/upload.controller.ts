// src/upload/upload.controller.ts
import { Controller, Post, UseInterceptors, UploadedFile, Res, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../common/multer.config';
import { UploadService } from './upload.service';
import { Response } from 'express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadImage(@UploadedFile() file: any, @Res() res: Response) {
    if (!file) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    try {
      // Get the public ID from the file object returned by Cloudinary
      const publicId = file.filename; // Adjust this if Cloudinary returns a different property
      const imageUrl = this.uploadService.getImageUrl(publicId);
      return res.json({ imageUrl });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}
