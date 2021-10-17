import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TechnicianModule } from '../technician/technician.module';
import { DoctorModule } from '../doctor/doctor.module';
import { PharmacistModule } from '../pharmacist/pharmacist.module';
import { PatientModule } from '../patient/patient.module';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TechnicianModule,
    DoctorModule,
    PharmacistModule,
    PatientModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
