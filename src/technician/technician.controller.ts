import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TechnicianService } from './technician.service';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';

@Controller('technician')
export class TechnicianController {
  constructor(private readonly technicianService: TechnicianService) {}

  @Post()
  create(@Body() createTechnicianDto: CreateTechnicianDto) {
    return this.technicianService.create(createTechnicianDto);
  }

  @Get()
  findAll() {
    return this.technicianService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.technicianService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTechnicianDto: UpdateTechnicianDto,
  ) {
    return this.technicianService.update(+id, updateTechnicianDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.technicianService.softDelete(+id);
  }
  @Get('restore/:id')
  restore(@Param('id') id: string) {
    return this.technicianService.restore(+id);
  }
}
