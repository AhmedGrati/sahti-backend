import { Patient } from '../../patient/entities/patient.entity';

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  patient: Patient;
}
