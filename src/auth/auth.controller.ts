import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up-dto';
import ConfirmEmailDto from './dto/confirm-email.dto';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordRequestDto } from './dto/reset-password-request.dto';
import { ResetPasswordConfirmDto } from './dto/reset-password-confirm.dto';
import { RefreshTokenRequestDto } from './dto/refresh-token-request.dto';

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
  @Delete('logout')
  async logout(@Body() refreshTokenRequestDto: RefreshTokenRequestDto) {
    return this.authService.logout(refreshTokenRequestDto);
  }

  @Post('confirm')
  async confirm(@Body() confirmEmailDto: ConfirmEmailDto) {
    return this.authService.confirmEmail(confirmEmailDto);
  }
  @Post('refresh-token')
  async refresh(@Body() refreshTokenRequestDto: RefreshTokenRequestDto) {
    return this.authService.refreshToken(refreshTokenRequestDto);
  }

  @Post('reset/request')
  async requestResetPassword(
    @Body() resetPasswordDto: ResetPasswordRequestDto,
  ) {
    return this.authService.requestResetPassword(resetPasswordDto);
  }
  @Get('reset/start/:token')
  async startResetPassword(@Param('token') token: string) {
    return this.authService.startResetPassword(token);
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
