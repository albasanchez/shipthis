import { Module } from '@nestjs/common';
import { GenerateFileService } from './generate-file.service';
import { GenerateFileController } from './generate-file.controller';
import { CreateQrService } from './qr/createQr.service';

@Module({
  exports:[],
  imports: [],
  controllers: [GenerateFileController],
  providers: [GenerateFileService, CreateQrService],
})
export class GenerateFileModule {}
