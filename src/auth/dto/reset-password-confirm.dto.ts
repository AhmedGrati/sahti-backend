import { IsNotEmpty } from 'class-validator';

export class ResetPasswordConfirmDto {
  @IsNotEmpty()
  password: string;
}
