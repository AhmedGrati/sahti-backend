import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Patient } from '../patient/entities/patient.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MailService {
  constructor(
    private readonly jwtService: JwtService,
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}
  async sendUserConfirmation(patient: Patient, token: string) {
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
  async sendResetConfirmation(patient: Patient, token: string) {
    const url =
      this.configService.get('APP_URL') + '/auth/reset/confirm/' + token;
    await this.mailerService.sendMail({
      to: patient.email,
      from: '"Support Team" <artzy.proj@gmail.com/>',
      subject: 'Sahti! Reset Password ',
      template: './confirmation',
      context: {
        name: patient.firstName,
        url: url,
      },
    });
  }
}
