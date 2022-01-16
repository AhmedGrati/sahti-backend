import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
import { Technician } from '../technician/entities/technician.entity';
import {
  TECHNICAL_FILE_NOT_FOUND_ERROR_MESSAGE,
  UNAUTHORIZED_TECHNICIAN_FILE_ADD_ERROR_MESSAGE,
  UNAUTHORIZED_TECHNICIAN_FILE_DELETE_ERROR_MESSAGE,
} from '../utils/constants';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class TechnicalCheckUpService {
  constructor(
    @InjectRepository(TechnicalCheckUp)
    private readonly technicalCheckUpRepository: Repository<TechnicalCheckUp>,
    private readonly fileService: FileService,
    private readonly patientService: PatientService,
  ) {}

  async create(
    createTechnicalCheckUpDto: CreateTechnicalCheckUpDto,
    files: Array<Express.Multer.File>,
    technician: Technician,
  ) {
    const checkup: TechnicalCheckUp =
      await this.technicalCheckUpRepository.create(createTechnicalCheckUpDto);
    checkup.technician = technician;
    const { patientId } = createTechnicalCheckUpDto;
    const patient = await this.patientService.findOne(patientId);
    checkup.medicalRecord = patient.medicalRecord;
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

  async update(
    id: number,
    updateTechnicalCheckUpDto: UpdateTechnicalCheckUpDto,
  ) {
    const technicalCheckUp = await this.technicalCheckUpRepository.preload({
      id,
      ...updateTechnicalCheckUpDto,
    });
    return this.technicalCheckUpRepository.save(technicalCheckUp);
  }

  remove(id: number) {
    return this.technicalCheckUpRepository.softDelete(id);
  }
  async addTechnicalFiles(
    technicalCheckUpId: number,
    files: Array<Express.Multer.File>,
    technician: Technician,
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
    if (technicalCheckUp.technician.id != technician.id) {
      throw new UnauthorizedException(
        UNAUTHORIZED_TECHNICIAN_FILE_ADD_ERROR_MESSAGE,
      );
    }
    technicalCheckUp.technicalFiles =
      technicalCheckUp.technicalFiles.concat(technicalFiles);
    return this.technicalCheckUpRepository.save(technicalCheckUp);
  }
  async deleteTechnicalFile(technicalFileId: number, technician: Technician) {
    const file = await this.fileService.findById(technicalFileId);
    if (file == null) {
      throw new NotFoundException(TECHNICAL_FILE_NOT_FOUND_ERROR_MESSAGE);
    }
    if (file.technicalCheckUp.technician.id != technician.id) {
      throw new UnauthorizedException(
        UNAUTHORIZED_TECHNICIAN_FILE_DELETE_ERROR_MESSAGE,
      );
    }
    return await this.fileService.removeTechnicalFile(technicalFileId);
  }
  async restore(id: number) {
    return this.technicalCheckUpRepository.restore(id);
  }
  async findAllByPatientId(patientId: number) {
    const patient = await this.patientService.findOne(patientId);
    return await this.technicalCheckUpRepository.find({
      relations: ['technician', 'technicalFiles', 'medicalRecord'],
      where: {
        medicalRecord: { id: patient.medicalRecord.id },
      },
    });
  }
}
