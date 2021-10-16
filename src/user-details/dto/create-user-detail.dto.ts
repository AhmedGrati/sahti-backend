import { IsEmail, IsNotEmpty } from 'class-validator';
import { RoleEnum } from '../entities/role.enum';

export class CreateUserDetailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  role: RoleEnum;
}
