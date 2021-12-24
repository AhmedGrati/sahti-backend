import { Injectable } from '@nestjs/common';
import { CreateTechnicalCheckUpDto } from './dto/create-technical-check-up.dto';
import { UpdateTechnicalCheckUpDto } from './dto/update-technical-check-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnicalCheckUp } from './entities/technical-check-up.entity';
import { FileService } from '../file/file.service';
// eslint-disable-next-line no-unused-vars
import { Buffer } from 'buffer';
import { Express } from 'express';
import { TechnicalFileDto } from '../file/dto/technical-file.dto';

@Injectable()
export class TechnicalCheckUpService {
  constructor(
    @InjectRepository(TechnicalCheckUp)
    private readonly technicalCheckUpRepository: Repository<TechnicalCheckUp>,
    private readonly fileService: FileService,
  ) {}

  async create(
    createTechnicalCheckUpDto: CreateTechnicalCheckUpDto,
    files: Array<Express.Multer.File>,
  ) {
    const checkup: TechnicalCheckUp =
      await this.technicalCheckUpRepository.create(createTechnicalCheckUpDto);
    const technicalFilesDTO: TechnicalFileDto[] = files.map((file) => {
      const filename = file.originalname;
      const dataBuffer = file.buffer;
      return { filename, dataBuffer };
    });
    const technicalFiles = await this.fileService.uploadFiles(
      technicalFilesDTO,
    );
    checkup.technicalFiles = technicalFiles;
    return await this.technicalCheckUpRepository.save(checkup);
  }

  async findAll() {
    return await this.technicalCheckUpRepository.find({
      relations: ['technicalFiles'],
    });
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
  async addTechnicalFiles(
    technicalCheckUpId: number,
    files: Array<Express.Multer.File>,
  ) {
    const technicalFilesDTO: TechnicalFileDto[] = files.map((file) => {
      const filename = file.originalname;
      const dataBuffer = file.buffer;
      return { filename, dataBuffer };
    });
    const technicalFiles = await this.fileService.uploadFiles(
      technicalFilesDTO,
    );
    const technicalCheckUp = await this.technicalCheckUpRepository.findOne({
      where: { id: technicalCheckUpId },
      relations: ['technicalFiles'],
    });
    technicalCheckUp.technicalFiles =
      technicalCheckUp.technicalFiles.concat(technicalFiles);
    return this.technicalCheckUpRepository.save(technicalCheckUp);
  }
}
