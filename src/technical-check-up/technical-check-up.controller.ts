import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TechnicalCheckUpService } from './technical-check-up.service';
import { CreateTechnicalCheckUpDto } from './dto/create-technical-check-up.dto';
import { UpdateTechnicalCheckUpDto } from './dto/update-technical-check-up.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { RoleEnum } from '../patient/entities/role.enum';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { Technician } from '../technician/entities/technician.entity';
import { Auth } from '../shared/decorators/auth.decorator';
@Controller('technical-check-up')
export class TechnicalCheckUpController {
  constructor(
    private readonly technicalCheckUpService: TechnicalCheckUpService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('technicalFiles'))
  @Auth(RoleEnum.TECHNICIAN)
  create(
    @Body() createTechnicalCheckUpDto: CreateTechnicalCheckUpDto,
    @UploadedFiles() technicalFiles: Array<Express.Multer.File>,
    @CurrentUser() technician: Technician,
  ) {
    return this.technicalCheckUpService.create(
      createTechnicalCheckUpDto,
      technicalFiles,
      technician,
    );
  }
  @Post('technical-files/:id')
  @UseInterceptors(FilesInterceptor('technicalFiles'))
  async addTechnicalFiles(
    @Param('id') id,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() technician: Technician,
  ) {
    return this.technicalCheckUpService.addTechnicalFiles(
      id,
      files,
      technician,
    );
  }

  @Get()
  findAll() {
    return this.technicalCheckUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicalCheckUpService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTechnicalCheckUpDto: UpdateTechnicalCheckUpDto,
  ) {
    return this.technicalCheckUpService.update(+id, updateTechnicalCheckUpDto);
  }

  @Delete('technical-file/:id')
  removeTechnicalFile(
    @Param('id') id: string,
    @CurrentUser() technician: Technician,
  ) {
    return this.technicalCheckUpService.deleteTechnicalFile(+id, technician);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalCheckUpService.remove(+id);
  }
  @Get('restore/:id')
  restore(@Param('id') id: string) {
    return this.technicalCheckUpService.restore(+id);
  }
}
