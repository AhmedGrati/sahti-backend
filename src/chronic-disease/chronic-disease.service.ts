import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChronicDiseaseDto } from './dto/create-chronic-disease.dto';
import { UpdateChronicDiseaseDto } from './dto/update-chronic-disease.dto';
import { ChronicDisease } from './entities/chronic-disease.entity';

@Injectable()
export class ChronicDiseaseService {
  constructor(
    @InjectRepository(ChronicDisease)
    private readonly chronicDiseaseRepository: Repository<ChronicDisease>,
  ) {}
  async create(
    createChronicDiseaseDto: CreateChronicDiseaseDto,
  ): Promise<ChronicDisease> {
    const createdChronicDisease = await this.chronicDiseaseRepository.create(
      createChronicDiseaseDto,
    );
    return await this.chronicDiseaseRepository.save(createdChronicDisease);
  }

  async findAll(): Promise<ChronicDisease[]> {
    return await this.chronicDiseaseRepository.find();
  }

  async findOne(id: number): Promise<ChronicDisease> {
    return await this.chronicDiseaseRepository.findOne({ where: { id } });
  }

  async update(id: number, updateChronicDiseaseDto: UpdateChronicDiseaseDto) {
    const diseaseToUpdate = await this.findOne(id);
    diseaseToUpdate.name = updateChronicDiseaseDto.name;
    return await this.chronicDiseaseRepository.save(diseaseToUpdate);
  }

  async softDelete(id: number) {
    return await this.chronicDiseaseRepository.softDelete(id);
  }

  async findByName(name: string) {
    return await this.chronicDiseaseRepository.findOne({ where: { name } });
  }

  async createIfNotExists(name: string) {
    const disease: ChronicDisease = await this.findByName(name);
    if (!disease) {
      return await this.create({ name });
    }
    return disease;
  }

  async createMultipleChronicDiseases(names: string[]) {
    return Promise.all(
      names.map(async (diseaseName) => {
        return this.createIfNotExists(diseaseName);
      }),
    );
  }
}
