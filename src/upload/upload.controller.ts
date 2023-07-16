import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '../common/decorators/public.decorator';
import { diskStorage } from 'multer';
import path from 'path';

@Controller('upload')
export class UploadController {
  @Public()
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const filename =
            path.parse(file.originalname).name.replace(/\s/g, '') + Date.now();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { key: file.path };
  }
}
