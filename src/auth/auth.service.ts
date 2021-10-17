import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up-dto';
import { TechnicianService } from '../technician/technician.service';
import { Patient } from '../patient/entities/patient.entity';
import { PatientService } from '../patient/patient.service';
import { DoctorService } from '../doctor/doctor.service';
import { PharmacistService } from '../pharmacist/pharmacist.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { RoleEnum } from '../patient/entities/role.enum';
import ConfirmEmailDto from './dto/confirmEmail.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly technicianService: TechnicianService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
    private readonly pharmacistService: PharmacistService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<Patient> {
    const existPatient = await this.patientService.userExistsByEmail(
      signUpDto.patient.email,
    );
    if (existPatient) {
      throw new HttpException(
        'The User With Given Email Already Exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    const patient = await this.signUpFactory(signUpDto);
    await this.mailService.sendUserConfirmation(patient);
    return patient;
  }

  async signUpFactory(signUpDto: SignUpDto): Promise<Patient> {
    switch (signUpDto.patient.role) {
      case RoleEnum.PATIENT:
        return this.patientService.create(signUpDto.patient);
      case RoleEnum.DOCTOR:
        const doctorDto = {
          ...signUpDto.patient,
          ...signUpDto.doctor,
        };
        return this.doctorService.create(doctorDto);
      case RoleEnum.PHARMACIST:
        const pharmacistDto = {
          ...signUpDto.patient,
          ...signUpDto.pharmacist,
        };
        return this.pharmacistService.create(pharmacistDto);
      case RoleEnum.TECHNICIAN:
        const technicianDto = {
          ...signUpDto.patient,
          ...signUpDto.technician,
        };
        return this.technicianService.create(technicianDto);
    }
  }

  public async confirmEmail(
    confirmEmailDto: ConfirmEmailDto,
  ): Promise<Patient> {
    const email = await this.decodeConfirmationToken(confirmEmailDto.token);
    const patient = await this.patientService.findByEmail(email);
    if (patient.isEmailVerified) {
      throw new BadRequestException('User Email already confirmed');
    }
    return await this.patientService.markEmailAsConfirmed(email);
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
