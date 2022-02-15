import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { PatientService } from '../patient/patient.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateNotFoundErrorMessage } from 'src/utils/error-message-generator';

@Injectable()
export class DoctorService {
  constructor(
    private readonly patientService: PatientService,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorRepository.create(createDoctorDto);
    return this.doctorRepository.save(doctor);
  }

  findAll() {
    return this.doctorRepository.find();
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({ where: { id } });
    if (doctor) {
      return doctor;
    }
    throw new NotFoundException(generateNotFoundErrorMessage(Doctor.name));
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.doctorRepository.preload({
      id,
      ...updateDoctorDto,
    });
    if (doctor) {
      return this.doctorRepository.save(doctor);
    }
    throw new NotFoundException(generateNotFoundErrorMessage(Doctor.name));
  }

  softDelete(id: number) {
    return this.doctorRepository.softDelete(id);
  }

  restore(id: number) {
    return this.doctorRepository.restore(id);
  }
}
