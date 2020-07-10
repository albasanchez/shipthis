import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolRepository } from './repositories/rol.repository';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RolRepository])],
  providers: [RolService],
  controllers: [RolController],
})
export class RolModule {}
