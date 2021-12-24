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

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('technical-check-up')
export class TechnicalCheckUpController {
  constructor(
    private readonly technicalCheckUpService: TechnicalCheckUpService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('technicalFiles'))
  create(
    @Body() createTechnicalCheckUpDto: CreateTechnicalCheckUpDto,
    @UploadedFiles() technicalFiles: Array<Express.Multer.File>,
  ) {
    return this.technicalCheckUpService.create(
      createTechnicalCheckUpDto,
      technicalFiles,
    );
  }
  @Post('technical-files/:id')
  @UseInterceptors(FilesInterceptor('technicalFiles'))
  async addTechnicalFiles(
    @Param('id') id,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.technicalCheckUpService.addTechnicalFiles(id, files);
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
