import { Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';

import { PatientService } from '../patient/patient.service';

@Injectable()
export class TechnicianService {
  constructor(
    private readonly patientService: PatientService,
    @InjectRepository(Technician)
    private readonly technicianRepository: Repository<Technician>,
  ) {}
  async create(createTechnicianDto: CreateTechnicianDto): Promise<Technician> {
    const technician = await this.technicianRepository.create(
      createTechnicianDto,
    );
    return this.technicianRepository.save(technician);
  }

  async findAll(): Promise<Technician[]> {
    return await this.technicianRepository.find();
  }

  async findOne(id: number): Promise<Technician> {
    return await this.technicianRepository.findOne(id);
  }

  async update(
    id: number,
    updateTechnicianDto: UpdateTechnicianDto,
  ): Promise<Technician> {
    const patient = await this.technicianRepository.preload({
      id,
      ...updateTechnicianDto,
    });
    return this.technicianRepository.save(patient);
  }

  async softDelete(id: number) {
    return await this.technicianRepository.softDelete(id);
  }
  async restore(id: number) {
    return await this.technicianRepository.restore(id);
  }
}
