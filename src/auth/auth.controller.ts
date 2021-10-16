import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post()
  create(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
  @Get('confirm/:token')
  async confirm(@Param('token') token) {
    return this.authService.confirmEmail(token);
  }
}
