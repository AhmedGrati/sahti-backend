import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PatientService } from '../../patient/patient.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly patientService: PatientService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_LOGIN_TOKEN_SECRET'),
    });
  }

  async validate(payload: TokenPayload) {
    const email: string = payload.email;
    const patient = await this.patientService.findByEmail(email);
    if (patient) {
      // eslint-disable-next-line no-unused-vars
      const { password: password, ...result } = patient;
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }
}
