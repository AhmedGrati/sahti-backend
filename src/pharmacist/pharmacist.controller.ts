import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';

@Controller('pharmacist')
export class PharmacistController {
  constructor(private readonly pharmacistService: PharmacistService) {}

  @Post()
  create(@Body() createPharmacistDto: CreatePharmacistDto) {
    return this.pharmacistService.create(createPharmacistDto);
  }

  @Get()
  findAll() {
    return this.pharmacistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmacistService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePharmacistDto: UpdatePharmacistDto,
  ) {
    return this.pharmacistService.update(+id, updatePharmacistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacistService.remove(+id);
  }
}
