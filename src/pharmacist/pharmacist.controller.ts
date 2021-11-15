import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PharmacistService } from './pharmacist.service';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';

@Controller('pharmacists')
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

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePharmacistDto: UpdatePharmacistDto,
  // ) {
  //   // return this.pharmacistService.update(+id, updatePharmacistDto);
  // }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.pharmacistService.softDelete(+id);
  }

  @Get('restore/:id')
  restore(@Param('id') id: string) {
    return this.pharmacistService.restore(+id);
  }
}
