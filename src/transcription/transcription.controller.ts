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
import { TranscriptionService } from './transcription.service';
import { CreateTranscriptionDto } from './dto/create-transcription.dto';
import { UpdateTranscriptionDto } from './dto/update-transcription.dto';

@Controller('transcriptions')
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

  @Get('non-checked')
  findNonChecked(@Query('patientId') patientId: string) {
    return this.transcriptionService.findListOfNonValidatedTranscriptions(
      +patientId,
    );
  }

  @Get('by-patient')
  findAllByPatientId(@Query('patientId') patientId: string) {
    return this.transcriptionService.findAllByPatientId(+patientId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transcriptionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTranscriptionDto: UpdateTranscriptionDto,
  ) {
    return this.transcriptionService.update(+id, updateTranscriptionDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.transcriptionService.softDelete(+id);
  }

  @Get('restore/:id')
  restore(@Param('id') id: string) {
    return this.transcriptionService.restore(+id);
  }

  @Post('check/:id')
  checkTranscription(@Param('id') id: string) {
    return this.transcriptionService.checkTranscription(+id);
  }
}
