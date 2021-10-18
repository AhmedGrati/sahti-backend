import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up-dto';
import ConfirmEmailDto from './dto/confirmEmail.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  create(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('confirm')
  async confirm(@Body() confirmEmailDto: ConfirmEmailDto) {
    return this.authService.confirmEmail(confirmEmailDto);
  }

  @Post('reset/request')
  async requestResetPassword(
    @Body() resetPasswordDto: ResetPasswordRequestDto,
  ) {
    return this.authService.requestResetPassword(resetPasswordDto);
  }

  @Post('reset/confirm/:token')
  async confirmResetPassword(
    @Body() resetPasswordConfirmDto: ResetPasswordConfirmDto,
    @Param('token') token: string,
  ) {
    return this.authService.confirmResetPassword(
      resetPasswordConfirmDto,
      token,
    );
  }
}
