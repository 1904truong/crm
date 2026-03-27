import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UploadController } from './controllers/upload.controller';
import { FileUploadService } from './services/file-upload.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [UploadController],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class CommonModule {}
