import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChronicDiseaseService } from './chronic-disease.service';
import { CreateChronicDiseaseDto } from './dto/create-chronic-disease.dto';
import { UpdateChronicDiseaseDto } from './dto/update-chronic-disease.dto';

@Controller('chronic-diseases')
export class ChronicDiseaseController {
  constructor(private readonly chronicDiseaseService: ChronicDiseaseService) {}

  @Post()
  create(@Body() createChronicDiseaseDto: CreateChronicDiseaseDto) {
    return this.chronicDiseaseService.create(createChronicDiseaseDto);
  }

  @Get()
  findAll() {
    return this.chronicDiseaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chronicDiseaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChronicDiseaseDto: UpdateChronicDiseaseDto,
  ) {
    return this.chronicDiseaseService.update(+id, updateChronicDiseaseDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.chronicDiseaseService.softDelete(+id);
  }
}
