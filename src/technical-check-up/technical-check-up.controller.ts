import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TechnicalCheckUpService } from './technical-check-up.service';
import { CreateTechnicalCheckUpDto } from './dto/create-technical-check-up.dto';
import { UpdateTechnicalCheckUpDto } from './dto/update-technical-check-up.dto';

@Controller('technical-check-up')
export class TechnicalCheckUpController {
  constructor(
    private readonly technicalCheckUpService: TechnicalCheckUpService,
  ) {}

  @Post()
  create(@Body() createTechnicalCheckUpDto: CreateTechnicalCheckUpDto) {
    return this.technicalCheckUpService.create(createTechnicalCheckUpDto);
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
