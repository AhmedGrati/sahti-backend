import { Module } from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { PharmacistController } from './pharmacist.controller';
import { PharmacyModule } from 'src/pharmacy/pharmacy.module';
import { UserDetailsModule } from 'src/user-details/user-details.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pharmacist } from './entities/pharmacist.entity';

@Module({
  imports: [
    PharmacyModule,
    UserDetailsModule,
    TypeOrmModule.forFeature([Pharmacist]),
  ],
  controllers: [PharmacistController],
  providers: [PharmacistService],
})
export class PharmacistModule {}
