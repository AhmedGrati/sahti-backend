import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { RoleEnum } from './patient/entities/role.enum';
import { Auth } from './shared/decorators/auth.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Auth(RoleEnum.PHARMACIST, RoleEnum.TECHNICIAN)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
