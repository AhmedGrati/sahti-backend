import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './shared/decorators/roles.decorator';
import { RoleEnum } from './patient/entities/role.enum';
import { RolesGuard } from './shared/guards/roles.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Roles(RoleEnum.PHARMACIST, RoleEnum.TECHNICIAN)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
