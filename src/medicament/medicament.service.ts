import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MEDICMANET_NOT_FOUND_ERROR_MESSAGE } from 'src/utils/constants';
import { Repository, UpdateResult } from 'typeorm';
import { CreateMedicamentDto } from './dto/create-medicament.dto';
import { UpdateMedicamentDto } from './dto/update-medicament.dto';
import { Medicament } from './entities/medicament.entity';

@Injectable()
export class MedicamentService {
  constructor(
    @InjectRepository(Medicament)
    private readonly medicamentRepository: Repository<Medicament>,
  ) {}
  async create(createMedicamentDto: CreateMedicamentDto): Promise<Medicament> {
    const medicament = await this.medicamentRepository.create(
      createMedicamentDto,
    );
    return this.medicamentRepository.save(medicament);
  }

  async findAll(): Promise<Medicament[]> {
    return this.medicamentRepository.find();
  }

  async findOne(id: number): Promise<Medicament> {
    const medicament = await this.medicamentRepository.findOne({
      where: { id },
    });
    if (medicament) {
      return medicament;
    }
    throw new NotFoundException(MEDICMANET_NOT_FOUND_ERROR_MESSAGE);
  }

  async update(id: number, updateMedicamentDto: UpdateMedicamentDto) {
    const medicament = await this.medicamentRepository.preload({
      id,
      ...updateMedicamentDto,
    });
    if (medicament) {
      return this.medicamentRepository.save(medicament);
    }
    throw new NotFoundException(MEDICMANET_NOT_FOUND_ERROR_MESSAGE);
  }

  async softDelete(id: number): Promise<UpdateResult> {
    return await this.medicamentRepository.softDelete(id);
  }

  async restore(id: number): Promise<UpdateResult> {
    return await this.medicamentRepository.restore(id);
  }
}
