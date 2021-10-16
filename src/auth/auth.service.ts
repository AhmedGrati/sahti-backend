import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-dto';
import { UserDetailsService } from '../user-details/user-details.service';
import { TechnicianService } from '../technician/technician.service';
import { Patient } from '../patient/entities/patient.entity';
import { RoleEnum } from '../user-details/entities/role.enum';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';
import { PharmacistService } from '../pharmacist/pharmacist.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UserDetail } from '../user-details/entities/user-detail.entity';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly userDetailsService: UserDetailsService,
    private readonly technicianService: TechnicianService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly pharmacistService: PharmacistService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Patient> {
    const existUser = await this.userDetailsService.userExistsByEmail(
      signUpDto.userDetail.email,
    );
    if (existUser) {
      throw new HttpException(
        'The User With Given Email Already Exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userDetail = await this.userDetailsService.create(
      signUpDto.userDetail,
    );
    const patient = await this.signUpFactory(signUpDto, userDetail.id);
    await this.mailService.sendUserConfirmation(patient);
    return patient;
  }

  async signUpFactory(
    signUpDto: SignUpDto,
    userDetailId: number,
  ): Promise<Patient> {
    switch (signUpDto.userDetail.role) {
      case RoleEnum.PATIENT:
        const patientDto = {
          userDetailId: userDetailId,
          ...signUpDto.patient,
        };
        return this.patientService.create(patientDto);
      case RoleEnum.DOCTOR:
        const doctorDto = {
          userDetailId: userDetailId,
          ...signUpDto.doctor,
        };
        return this.doctorService.create(doctorDto);
      case RoleEnum.PHARMACIST:
        const pharmacistDto = {
          userDetailId: userDetailId,
          ...signUpDto.pharmacist,
        };
        return this.pharmacistService.create(pharmacistDto);
      case RoleEnum.TECHNICIAN:
        const technicianDto = {
          userDetailId: userDetailId,
          ...signUpDto.technician,
        };
        return this.technicianService.create(technicianDto);
    }
  }

  public async confirmEmail(token: string): Promise<UserDetail> {
    const email = await this.decodeConfirmationToken(token);
    const user = await this.userDetailsService.findByEmail(email);
    if (user.isEmailVerified) {
      throw new BadRequestException('Email already confirmed');
    }
    return await this.userDetailsService.markEmailAsConfirmed(email);
  }
  public async decodeConfirmationToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
