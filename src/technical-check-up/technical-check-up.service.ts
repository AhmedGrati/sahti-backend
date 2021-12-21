import { Injectable } from '@nestjs/common';
import { CreateTechnicalCheckUpDto } from './dto/create-technical-check-up.dto';
import { UpdateTechnicalCheckUpDto } from './dto/update-technical-check-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnicalCheckUp } from './entities/technical-check-up.entity';
import { FileService } from '../file/file.service';
import { Buffer } from 'buffer';

@Injectable()
export class TechnicalCheckUpService {
  constructor(
    @InjectRepository(TechnicalCheckUp)
    private readonly technicalCheckUpRepository: Repository<TechnicalCheckUp>,
    private readonly fileService: FileService,
  ) {}
  create(
    createTechnicalCheckUpDto: CreateTechnicalCheckUpDto,
    fileBuffer: Buffer,
    fileName: string,
  ) {
    return 'This action adds a new technicalCheckUp';
  }

  findAll() {
    return `This action returns all technicalCheckUp`;
  }

  async findOne(id: number): Promise<TechnicalCheckUp> {
    return await this.technicalCheckUpRepository.findOne(+id);
  }

  update(id: number, updateTechnicalCheckUpDto: UpdateTechnicalCheckUpDto) {
    return `This action updates a #${id} technicalCheckUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} technicalCheckUp`;
  }
  async addTechnicalFile(
    technicalCheckUpId: number,
    fileBuffer: Buffer,
    filename: string,
  ) {
    const technicalFile = await this.fileService.uploadFile(
      fileBuffer,
      filename,
    );
    const technicalCheckUp = await this.findOne(technicalCheckUpId);
    await this.technicalCheckUpRepository.update(technicalCheckUpId, {
      ...technicalCheckUp,
      technicalFile,
    });
    return technicalFile;
  }
}
