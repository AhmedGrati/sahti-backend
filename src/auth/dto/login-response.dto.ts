import { RoleEnum } from '../../patient/entities/role.enum';

export class LoginResponseDto {
  token: string;
  role: RoleEnum;
}
