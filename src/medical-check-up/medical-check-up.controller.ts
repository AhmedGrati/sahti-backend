import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicalCheckUpService } from './medical-check-up.service';
import { CreateMedicalCheckUpDto } from './dto/create-medical-check-up.dto';
import { UpdateMedicalCheckUpDto } from './dto/update-medical-check-up.dto';

@Controller('medical-check-up')
export class MedicalCheckUpController {
  constructor(private readonly medicalCheckUpService: MedicalCheckUpService) {}

  @Post()
  create(@Body() createMedicalCheckUpDto: CreateMedicalCheckUpDto) {
    return this.medicalCheckUpService.create(createMedicalCheckUpDto);
  }

  @Get()
  findAll() {
    return this.medicalCheckUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalCheckUpService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicalCheckUpDto: UpdateMedicalCheckUpDto,
  ) {
    return this.medicalCheckUpService.update(+id, updateMedicalCheckUpDto);
  }
  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.medicalCheckUpService.softDelete(+id);
  }

  @Get('restore/:id')
  restore(@Param('id') id: string) {
    return this.medicalCheckUpService.restore(+id);
  }
}
