import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';

export function UploadFileDecorator() {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: process.env?.STORAGE_PATH,
          filename: (_, file, cb) => {
            const fileName = file.originalname.replace(/\s/g, '');
            cb(null, Date.now() + '-' + fileName);
          },
        }),
        limits: {
          fileSize: +process.env.UPLOAD_FILE_MAX_SIZE,
        },
      }),
    ),
    ApiConsumes('multipart/form-data'),
  );
}
