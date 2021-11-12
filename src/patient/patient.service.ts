import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const patient = await this.patientRepository.create(createPatientDto);
    return this.patientRepository.save(patient);
  }

  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: number): Promise<Patient> {
    return this.patientRepository.findOne(id);
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    const patient = await this.patientRepository.preload({
      id,
      ...updatePatientDto,
    });
    return this.patientRepository.save(patient);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.patientRepository.delete(id);
  }
  async userExistsByEmail(userEmail: string): Promise<boolean> {
    return (await this.findByEmail(userEmail)) != null;
  }
  async findByEmail(userEmail: string): Promise<Patient> {
    return await this.patientRepository.findOne({
      where: { email: userEmail },
    });
  }
  async markEmailAsConfirmed(userEmail: string): Promise<Patient> {
    const patient = await this.findByEmail(userEmail);
    patient.isEmailVerified = true;
    return this.patientRepository.save(patient);
  }
}
