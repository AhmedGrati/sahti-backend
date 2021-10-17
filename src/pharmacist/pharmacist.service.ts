import { Injectable } from '@nestjs/common';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';

import { PatientService } from '../patient/patient.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pharmacist } from './entities/pharmacist.entity';

@Injectable()
export class PharmacistService {
  constructor(
    private readonly patientService: PatientService,
    @InjectRepository(Pharmacist)
    private readonly pharmacistRepository: Repository<Pharmacist>,
  ) {}
  async create(createPharmacistDto: CreatePharmacistDto): Promise<Pharmacist> {
    const pharmacist = await this.pharmacistRepository.create(
      createPharmacistDto,
    );
    return this.pharmacistRepository.save(pharmacist);
  }

  findAll() {
    return `This action returns all pharmacist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pharmacist`;
  }

  update(id: number, updatePharmacistDto: UpdatePharmacistDto) {
    return `This action updates a #${id} pharmacist`;
  }

  remove(id: number) {
    return `This action removes a #${id} pharmacist`;
  }
}
