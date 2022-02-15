import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../../patient/entities/patient.entity';

export class LoginResponseDto {
  @ApiProperty()
  accessToken: string;
  @ApiProperty()
  refreshToken: string;
  @ApiProperty()
  patient: Patient;
}
