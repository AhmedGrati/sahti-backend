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
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import * as crypto from 'crypto-js';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';
import { RedisCacheService } from '../redis-cache/redis-cache.service';
import {
  BAD_TOKEN_ERROR_MESSAGE,
  EXPIRED_TOKEN_ERROR_MESSAGE,
  USER_ALREADY_CONFIRMED_ERROR_MESSAGE,
  USER_ALREADY_EXISTS_ERROR_MESSAGE,
} from '../utils/constants';
import { AuthTokenStrategy } from './strategies/auth-strategy/auth-token-strategy.interface';
import { ConfirmationTokenStrategy } from './strategies/auth-strategy/confirmation-token-strategy';
import { RefreshTokenStrategy } from './strategies/auth-strategy/refresh-token-strategy';
import { AccessTokenStrategy } from './strategies/auth-strategy/access-token-strategy';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisCacheService: RedisCacheService,
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
    const userEmail = await this.verifyToken(
      refreshToken,
      new RefreshTokenStrategy(this.configService),
    );
    const cacheToken = await this.redisCacheService.get(userEmail);
    if (cacheToken == null || cacheToken != refreshToken) {
      throw new UnauthorizedException(BAD_TOKEN_ERROR_MESSAGE);
    }
    const patient = await this.patientService.findByEmail(userEmail);
    const tokenPayload: TokenPayload = {
      id: patient.id,
      email: patient.email,
    };
    const accessToken = this.encodeToken(
      tokenPayload,
      new AccessTokenStrategy(this.configService),
    );
    const refreshTokenUpdated = this.encodeToken(
      tokenPayload,
      new RefreshTokenStrategy(this.configService),
    );
    await this.redisCacheService.set(userEmail, refreshTokenUpdated);

    return {
      refreshToken: refreshTokenUpdated,
      accessToken: accessToken,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;
    const patient = await this.validateUser(email, password);
    if (patient) {
      const tokenPayload: TokenPayload = {
        id: patient.id,
        email: patient.email,
      };
      const accessToken = this.encodeToken(
        tokenPayload,
        new AccessTokenStrategy(this.configService),
      );
      const refreshToken = this.encodeToken(
        tokenPayload,
        new RefreshTokenStrategy(this.configService),
      );
      await this.redisCacheService.set(email, refreshToken);
      const loginResponseDto: LoginResponseDto = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        patient: patient,
      };
      return loginResponseDto;
    }
    throw new UnauthorizedException();
  }

  async logout(refreshTokenRequestDto: RefreshTokenRequestDto): Promise<void> {
    const { refreshToken } = refreshTokenRequestDto;
    const userEmail = await this.verifyToken(
      refreshToken,
      new RefreshTokenStrategy(this.configService),
    );
    const cachedToken = await this.redisCacheService.get(userEmail);
    if (cachedToken == null || cachedToken != refreshToken) {
      throw new UnauthorizedException(BAD_TOKEN_ERROR_MESSAGE);
    }
    await this.redisCacheService.del(userEmail);
  }

  async signUp(signUpDto: SignUpDto): Promise<Patient> {
    const existPatient = await this.patientService.userExistsByCinOrEmail(
      signUpDto.patient.email,
      signUpDto.patient.cin,
    );
    if (existPatient) {
      throw new HttpException(
        USER_ALREADY_EXISTS_ERROR_MESSAGE,
        HttpStatus.BAD_REQUEST,
      );
    }
    const patient = await this.signUpFactory(signUpDto);
    const payload: TokenPayload = { id: patient.id, email: patient.email };
    const confirmToken = this.encodeToken(
      payload,
      new ConfirmationTokenStrategy(this.configService),
    );
    this.mailService.sendUserConfirmation(patient, confirmToken);
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
    const email = await this.verifyToken(
      confirmEmailDto.token,
      new ConfirmationTokenStrategy(this.configService),
    );
    const patient = await this.patientService.findByEmail(email);
    if (patient.isEmailVerified) {
      throw new BadRequestException(USER_ALREADY_CONFIRMED_ERROR_MESSAGE);
    }
    return await this.patientService.markEmailAsConfirmed(email);
  }

  public async confirmResetPassword(
    resetPasswordConfirmDto: ResetPasswordConfirmDto,
    token: string,
  ): Promise<Patient> {
    const email = await this.verifyResetToken(token);
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

  public async verifyToken(
    token: string,
    authTokenStrategy: AuthTokenStrategy,
  ): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: authTokenStrategy.getSecret(),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }
      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException(EXPIRED_TOKEN_ERROR_MESSAGE);
      }
      throw new BadRequestException(BAD_TOKEN_ERROR_MESSAGE);
    }
  }

  public async verifyResetToken(token: string): Promise<string> {
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
            throw new BadRequestException(EXPIRED_TOKEN_ERROR_MESSAGE);
          }
          throw new BadRequestException(BAD_TOKEN_ERROR_MESSAGE);
        }
      }
    }
    throw new BadRequestException();
  }

  async requestResetPassword(
    resetPasswordDto: ResetPasswordRequestDto,
  ): Promise<Patient> {
    const { email } = resetPasswordDto;
    const patient = await this.patientService.findByEmail(email);
    const token = await this.encodeResetToken(patient);
    this.mailService.sendResetConfirmation(patient, token);
    return patient;
  }

  public encodeToken(
    payload: TokenPayload,
    authTokenStrategy: AuthTokenStrategy,
  ): string {
    return this.jwtService.sign(payload, {
      secret: authTokenStrategy.getSecret(),
      expiresIn: authTokenStrategy.getExpirationTime(),
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

  async startResetPassword(token: string) {
    const email = await this.verifyResetToken(token);
    if (email) {
      return email;
    }
    throw new BadRequestException(BAD_TOKEN_ERROR_MESSAGE);
  }
}
