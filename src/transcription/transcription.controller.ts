import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';

@Controller('transcription')
export class TranscriptionController {
  constructor(private readonly transcriptionService: TranscriptionService) {}

  @Post()
  create(@Body() createTranscriptionDto: CreateTranscriptionDto) {
    return this.transcriptionService.create(createTranscriptionDto);
  }

  @Get()
  findAll() {
    return this.transcriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transcriptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTranscriptionDto: UpdateTranscriptionDto) {
    return this.transcriptionService.update(+id, updateTranscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transcriptionService.remove(+id);
  }
}
