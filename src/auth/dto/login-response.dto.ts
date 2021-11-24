import { RoleEnum } from '../../patient/entities/role.enum';

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  role: RoleEnum;
  //TODO : change role to user entity
}
