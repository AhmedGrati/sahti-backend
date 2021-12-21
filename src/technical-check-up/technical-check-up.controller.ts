import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { TechnicalCheckUpService } from './technical-check-up.service';
import { CreateTechnicalCheckUpDto } from './dto/create-technical-check-up.dto';
import { UpdateTechnicalCheckUpDto } from './dto/update-technical-check-up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../shared/guards/roles.guard';
import { Express } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('technical-check-up')
export class TechnicalCheckUpController {
  constructor(
    private readonly technicalCheckUpService: TechnicalCheckUpService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('technicalFile'))
  create(
    @Body() createTechnicalCheckUpDto: CreateTechnicalCheckUpDto,
    @UploadedFile() technicalFile: Express.Multer.File,
  ) {
    return this.technicalCheckUpService.create(
      createTechnicalCheckUpDto,
      technicalFile.buffer,
      technicalFile.filename,
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.technicalCheckUpService.remove(+id);
  }
}
