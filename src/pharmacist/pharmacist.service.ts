import { Injectable } from '@nestjs/common';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';

@Injectable()
export class PharmacistService {
  create(createPharmacistDto: CreatePharmacistDto) {
    return 'This action adds a new pharmacist';
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
