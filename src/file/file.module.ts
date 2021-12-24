import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnicalFile } from './entities/technical-file.entity';

@Module({
  providers: [FileService],
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([TechnicalFile])],
  exports: [FileService],
})
export class FileModule {}
