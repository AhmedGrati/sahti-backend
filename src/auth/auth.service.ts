import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
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
import ConfirmEmailDto from './dto/confirm-email.dto';
import VerificationTokenPayload from './entities/verificationTokenPayload.interface';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import * as crypto from 'crypto-js';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';

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

  async validateUser(email: string, pass: string): Promise<Patient> {
    const patient = await this.patientService.findByEmail(email);
    console.log(pass);
    if (patient) {
      const isPassEqual = await bcrypt.compare(pass, patient.password);
      if (isPassEqual) {
        return patient;
      }
    }
    return null;
  }
  async refreshToken(
    refreshTokenRequestDto: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    const { refreshToken } = refreshTokenRequestDto;
    const userEmail = await this.decodeRefreshToken(refreshToken);
    const patient = await this.patientService.findByEmail(userEmail);
    const refreshTokenUpdated = this.encodeRefreshToken(patient);
    const accessToken = this.encodeAccessToken(patient);
    return {
      refreshToken: refreshTokenUpdated,
      accessToken: accessToken,
    };
  }
  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    const patient = await this.validateUser(email, password);
    if (patient) {
      const accessToken = this.encodeAccessToken(patient);
      const refreshToken = this.encodeRefreshToken(patient);
      const loginResponseDto: LoginResponseDto = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: patient.role,
      };
      return loginResponseDto;
    }
    throw new UnauthorizedException();
  }

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
    const confirmToken = this.encodeConfirmationToken(patient);
    await this.mailService.sendUserConfirmation(patient, confirmToken);
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

  public async confirmResetPassword(
    resetPasswordConfirmDto: ResetPasswordConfirmDto,
    token: string,
  ): Promise<Patient> {
    const email = await this.decodeResetToken(token);
    if (email) {
      const patient = await this.patientService.findByEmail(email);
      const passwordHash = await bcrypt.hash(
        resetPasswordConfirmDto.password,
        await bcrypt.genSalt(),
      );
      return this.patientService.update(patient.id, { password: passwordHash });
    }
    throw new BadRequestException();
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

  public async decodeResetToken(token: string): Promise<string> {
    const payload = this.jwtService.decode(token);
    if (typeof payload === 'object' && 'email' in payload) {
      const patient = await this.patientService.findByEmail(payload.email);
      if (patient) {
        try {
          const secret = await this.generateResetSecret(patient);
          const payload = await this.jwtService.verify(token, {
            secret: secret,
          });
          return payload.email;
        } catch (error) {
          if (error?.name === 'TokenExpiredError') {
            throw new BadRequestException('Email confirmation token expired');
          }
          throw new BadRequestException('Bad confirmation token');
        }
      }
    }
    throw new BadRequestException();
  }
  public async decodeRefreshToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Refresh token expired');
      }
      throw new BadRequestException('Bad refresh token');
    }
  }

  async requestResetPassword(
    resetPasswordDto: ResetPasswordRequestDto,
  ): Promise<Patient> {
    const { email } = resetPasswordDto;
    const patient = await this.patientService.findByEmail(email);
    const token = await this.encodeResetToken(patient);
    await this.mailService.sendResetConfirmation(patient, token);
    return patient;
  }

  public encodeConfirmationToken(patient: Patient): string {
    const payload: VerificationTokenPayload = {
      email: patient.email,
    };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  public encodeAccessToken(patient: Patient): string {
    const payload: TokenPayload = { id: patient.id, email: patient.email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_LOGIN_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_LOGIN_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  public encodeRefreshToken(patient: Patient): string {
    const payload: TokenPayload = { id: patient.id, email: patient.email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
  }

  public async encodeResetToken(patient: Patient): Promise<string> {
    const payload: TokenPayload = { id: patient.id, email: patient.email };
    const secret = await this.generateResetSecret(patient);
    const token = await this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: `${this.configService.get(
        'JWT_LOGIN_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    return token;
  }

  public async generateResetSecret(patient: Patient): Promise<string> {
    const secret =
      patient.id +
      patient.email +
      patient.password +
      this.configService.get('JWT_RESET_TOKEN_SECRET');
    const secretHash = await crypto.HmacSHA256(
      secret,
      this.configService.get('JWT_RESET_TOKEN_SECRET'),
    );
    return secretHash.toString();
  }
}
