import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';
import { PharmacyService } from 'src/pharmacy/pharmacy.service';
import { UserDetail } from 'src/user-details/entities/user-detail.entity';
import { UserDetailsService } from 'src/user-details/user-details.service';
import { PHARMACIST_NOT_FOUND_ERROR_MESSAGE } from 'src/utils/constants';
import { Repository } from 'typeorm';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';
import { Pharmacist } from './entities/pharmacist.entity';

@Injectable()
export class PharmacistService {
  constructor(
    private readonly pharmacyService: PharmacyService,
    private readonly userDetailsService: UserDetailsService,
    @InjectRepository(Pharmacist)
    private readonly pharmacistRepository: Repository<Pharmacist>,
  ) {}
  async create(createPharmacistDto: CreatePharmacistDto) {
    const { pharmacyId, userDetailsId } = createPharmacistDto;
    const pharmacy: Pharmacy = await this.pharmacyService.findOne(pharmacyId);
    const userDetails: UserDetail = await this.userDetailsService.findOne(
      userDetailsId,
    );

    const pharmacist = await this.pharmacistRepository.create({});
    pharmacist.pharmacy = pharmacy;
    pharmacist.userDetail = userDetails;

    return await this.pharmacistRepository.save(pharmacist);
  }

  async findAll(): Promise<Pharmacist[]> {
    return this.pharmacistRepository.find();
  }

  findOne(id: number): Promise<Pharmacist> {
    return this.pharmacistRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePharmacistDto: UpdatePharmacistDto) {
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
  }

  async softDelete(id: number) {
    return await this.pharmacistRepository.softDelete(id);
  }

  async restore(id: number) {
    return await this.pharmacistRepository.restore(id);
  }
}
