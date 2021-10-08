import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PHARMACY_NOT_FOUND_ERROR_MESSAGE } from '../utils/constants';
import { Repository, UpdateResult } from 'typeorm';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { Pharmacy } from './entities/pharmacy.entity';

@Injectable()
export class PharmacyService {
  constructor(
    @InjectRepository(Pharmacy)
    private readonly pharmacyRepository: Repository<Pharmacy>,
  ) {}
  async create(createPharmacyDto: CreatePharmacyDto): Promise<Pharmacy> {
    const newPharmacy = await this.pharmacyRepository.create(createPharmacyDto);
    return await this.pharmacyRepository.save(newPharmacy);
  }

  async findAll(): Promise<Pharmacy[]> {
    return await this.pharmacyRepository.find();
  }

  async findOne(id: number): Promise<Pharmacy> {
    const pharmacy = await this.pharmacyRepository.findOne({ where: { id } });
    if (pharmacy) {
      return pharmacy;
    }
    throw new NotFoundException(PHARMACY_NOT_FOUND_ERROR_MESSAGE);
  }

  async update(
    id: number,
    updatePharmacyDto: UpdatePharmacyDto,
  ): Promise<Pharmacy> {
    const pharmacy = await this.pharmacyRepository.preload({
      id,
      ...updatePharmacyDto,
    });
    if (pharmacy) {
      return this.pharmacyRepository.save(pharmacy);
    }
    throw new NotFoundException(PHARMACY_NOT_FOUND_ERROR_MESSAGE);
  }

  async softDelete(id: number): Promise<UpdateResult> {
    return await this.pharmacyRepository.softDelete(id);
  }

  async restore(id: number): Promise<UpdateResult> {
    return await this.pharmacyRepository.restore(id);
  }
}
