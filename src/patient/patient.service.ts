import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { UserDetailsService } from '../user-details/user-details.service';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly userDetailsService: UserDetailsService,
  ) {}
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const userDetail = await this.userDetailsService.findOne(
      createPatientDto.userDetailId,
    );
    if (!userDetail) {
      throw new HttpException(
        'The User Details Provided Dosent Exists',
        HttpStatus.NOT_FOUND,
      );
    }
    const patient = await this.patientRepository.create(createPatientDto);
    patient.userDetail = userDetail;
    return this.patientRepository.save(patient);
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
