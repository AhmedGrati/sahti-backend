import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateNotFoundErrorMessage } from 'src/utils/error-message-generator';
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

  async findAll(filter = ''): Promise<Medicament[]> {
    if (filter == '') {
      return this.medicamentRepository.find();
    }
    filter = filter.toLowerCase();
    return this.medicamentRepository.query(
      `select * from medicament where lower("name") LIKE '${filter}%'`,
    );
  }

  async findOne(id: number): Promise<Medicament> {
    const medicament = await this.medicamentRepository.findOne({
      where: { id },
    });
    if (medicament) {
      return medicament;
    }
    throw new NotFoundException(generateNotFoundErrorMessage(Medicament.name));
  }

  async update(id: number, updateMedicamentDto: UpdateMedicamentDto) {
    const medicament = await this.medicamentRepository.preload({
      id,
      ...updateMedicamentDto,
    });
    if (medicament) {
      return this.medicamentRepository.save(medicament);
    }
    throw new NotFoundException(generateNotFoundErrorMessage(Medicament.name));
  }

  async softDelete(id: number): Promise<UpdateResult> {
    return await this.medicamentRepository.softDelete(id);
  }

  async restore(id: number): Promise<UpdateResult> {
    return await this.medicamentRepository.restore(id);
  }

  async findOneByName(name: string): Promise<Medicament> {
    const medicament = await this.medicamentRepository.findOne({
      where: { name },
    });
    if (medicament) {
      return medicament;
    }
    throw new NotFoundException(generateNotFoundErrorMessage(Medicament.name));
  }

  async findByIdList(idList: number[]): Promise<Medicament[]> {
    const medicaments = [];
    for (let i = 0; i < idList.length; i++) {
      const id = idList[i];
      const medicament = await this.findOne(id);
      medicaments.push(medicament);
    }
    return medicaments;
  }
  async findByNameList(nameList: string[]): Promise<Medicament[]> {
    const medicaments = [];
    for (let i = 0; i < nameList.length; i++) {
      const name = nameList[i];
      const medicament = await this.findOneByName(name);
      medicaments.push(medicament);
    }
    return medicaments;
  }
}
