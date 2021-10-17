import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Patient } from '../patient/entities/patient.entity';
import VerificationTokenPayload from '../auth/entities/verificationTokenPayload.interface';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UrlGeneratorService } from 'nestjs-url-generator';

@Injectable()
export class MailService {
  constructor(
    private readonly jwtService: JwtService,
    private mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly urlGeneratorService: UrlGeneratorService,
  ) {}
  async sendUserConfirmation(patient: Patient) {
    const token = this.encodeConfirmationToken(patient);
    const url = this.configService.get('APP_URL') + '/auth/confirm/' + token;
    await this.mailerService.sendMail({
      to: patient.email,
      from: '"Support Team" <artzy.proj@gmail.com/>',
      subject: 'Welcome to Sahti! Confirm your Email',
      template: './confirmation',
      context: {
        name: patient.firstName,
        url: url,
      },
    });
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
}
