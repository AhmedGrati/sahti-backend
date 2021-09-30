import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfigService } from './config/DatabaseConfigService';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfigService)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
