import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';

import { PatientService } from '../patient/patient.service';
import { Pharmacist } from './entities/pharmacist.entity';
import { generateNotFoundErrorMessage } from 'src/utils/error-message-generator';
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

  async findAll(): Promise<Pharmacist[]> {
    return this.pharmacistRepository.find();
  }

  findOne(id: number): Promise<Pharmacist> {
    const pharmacist = this.pharmacistRepository.findOne({ where: { id } });
    if (pharmacist) {
      return pharmacist;
    }
    throw new NotFoundException(generateNotFoundErrorMessage(Pharmacist.name));
  }

  /*async update(id: number, updatePharmacistDTO: UpdatePharmacistDto) {
    const pharmacist: Pharmacist = await this.findOne(id);
    if(pharmacist) {

    }
  }*/

  /*async update(id: number, updatePharmacistDto: UpdatePharmacistDto) {
    const pharmacist: Pharmacist = await this.findOne(id);
    if (pharmacist) {
      const { pharmacyId, userDetailsId } = updatePharmacistDto;
      const pharmacy: Pharmacy = await this.pharmacyService.findOne(pharmacyId);
      const userDetails: UserDetail = await this.userDetailsService.findOne(
        userDetailsId,
      );

      pharmacist.pharmacy = pharmacy;
      pharmacist.userDetail = userDetails;
      return await this.pharmacistRepository.save(pharmacist);
    }
    throw new NotFoundException(PHARMACIST_NOT_FOUND_ERROR_MESSAGE);
  }*/

  async softDelete(id: number) {
    return await this.pharmacistRepository.softDelete(id);
  }

  async restore(id: number) {
    return await this.pharmacistRepository.restore(id);
  }
}
