import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { UserDetailsService } from '../user-details/user-details.service';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { USER_DETAILS_NOT_FOUND_ERROR_MESSAGE } from 'src/utils/constants';
/*
 1- auth methode esemha sign up {}
 2- get user details => creation => user details ID
 3- switch case sur le type
*/
@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    private readonly userDetailsService: UserDetailsService,
  ) {}
  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { userDetailsId, ...dto } = createPatientDto;
    const userDetails: UserDetail = await this.userDetailsService.findOne(
      userDetailsId,
    );
    if (userDetails) {
      const patient = this.patientRepository.create(dto);
      patient.userDetail = userDetails;
      return this.patientRepository.save(patient);
    }
    throw new NotFoundException(USER_DETAILS_NOT_FOUND_ERROR_MESSAGE);
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
