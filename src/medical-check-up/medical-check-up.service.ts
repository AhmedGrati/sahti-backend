import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorService } from 'src/doctor/doctor.service';
import { generateNotFoundErrorMessage } from 'src/utils/error-message-generator';
import { Repository } from 'typeorm';
import { CreateMedicalCheckUpDto } from './dto/create-medical-check-up.dto';
import { UpdateMedicalCheckUpDto } from './dto/update-medical-check-up.dto';
import { MedicalCheckUp } from './entities/medical-check-up.entity';

@Injectable()
export class MedicalCheckUpService {
  constructor(
    @InjectRepository(MedicalCheckUp)
    private readonly medicalCheckUpRepository: Repository<MedicalCheckUp>,
    private readonly doctorService: DoctorService,
  ) {}
  async create(
    createMedicalCheckUpDto: CreateMedicalCheckUpDto,
  ): Promise<MedicalCheckUp> {
    const { additionalInformation, doctorId } = createMedicalCheckUpDto;
    const medicalCheckUp = await this.medicalCheckUpRepository.create({});
    medicalCheckUp.additionalInformation = additionalInformation;
    const doctor = await this.doctorService.findOne(doctorId);
    medicalCheckUp.doctor = doctor;
    return this.medicalCheckUpRepository.save(doctor);
  }

  findAll(): Promise<MedicalCheckUp[]> {
    return this.medicalCheckUpRepository.find();
  }

  async findOne(id: number) {
    const medicalCheckUp = await this.medicalCheckUpRepository.findOne({
      where: { id },
    });
    if (medicalCheckUp) {
      return medicalCheckUp;
    }
    throw new NotFoundException(
      generateNotFoundErrorMessage(MedicalCheckUp.name),
    );
  }

  /** When a medical check up is created you cannot update the doctor of the checkup */
  async update(
    id: number,
    updateMedicalCheckUpDto: UpdateMedicalCheckUpDto,
  ): Promise<MedicalCheckUp> {
    const medicalCheckUp = await this.findOne(id);
    medicalCheckUp.additionalInformation =
      updateMedicalCheckUpDto.additionalInformation;
    return this.medicalCheckUpRepository.save(medicalCheckUp);
  }

  softDelete(id: number) {
    return this.medicalCheckUpRepository.softDelete(id);
  }

  restore(id: number) {
    return this.medicalCheckUpRepository.restore(id);
  }
}
