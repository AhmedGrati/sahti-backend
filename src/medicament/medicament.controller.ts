import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MedicamentService } from './medicament.service';
import { CreateMedicamentDto } from './dto/create-medicament.dto';
import { UpdateMedicamentDto } from './dto/update-medicament.dto';

@Controller('medicaments')
export class MedicamentController {
  constructor(private readonly medicamentService: MedicamentService) {}

  @Post()
  create(@Body() createMedicamentDto: CreateMedicamentDto) {
    return this.medicamentService.create(createMedicamentDto);
  }

  @Get()
  findAll(@Query('filter') filter: string) {
    return this.medicamentService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicamentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicamentDto: UpdateMedicamentDto,
  ) {
    return this.medicamentService.update(+id, updateMedicamentDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.medicamentService.softDelete(+id);
  }

  @Get('restore/:id')
  restore(@Param('id') id: string) {
    return this.medicamentService.restore(+id);
  }
}
