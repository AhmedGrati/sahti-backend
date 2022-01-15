import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MedicalRecordService } from './medical-record.service';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';

@Controller('medical-records')
export class MedicalRecordController {
  constructor(private readonly medicalRecordService: MedicalRecordService) {}

  @Post()
  create(@Body() createMedicalRecordDto: CreateMedicalRecordDto) {
    return this.medicalRecordService.create(createMedicalRecordDto);
  }

  @Get()
  findAll() {
    return this.medicalRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicalRecordService.findOne(+id);
  }
  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateMedicalRecordDto: UpdateMedicalRecordDto,
  // ) {
  //   return this.medicalRecordService.update(+id, updateMedicalRecordDto);
  // }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.medicalRecordService.softDelete(+id);
  }
}
