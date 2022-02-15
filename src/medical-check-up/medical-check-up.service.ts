import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorService } from 'src/doctor/doctor.service';
import { MedicalRecordService } from 'src/medical-record/medical-record.service';
import { TranscriptionService } from 'src/transcription/transcription.service';
import { generateNotFoundErrorMessage } from 'src/utils/error-message-generator';
import { Repository } from 'typeorm';
import { CreateMedicalCheckUpDto } from './dto/create-medical-check-up.dto';
// import { UpdateMedicalCheckUpDto } from './dto/update-medical-check-up.dto';
import { MedicalCheckUp } from './entities/medical-check-up.entity';

@Injectable()
export class MedicalCheckUpService {
  constructor(
    @InjectRepository(MedicalCheckUp)
    private readonly medicalCheckUpRepository: Repository<MedicalCheckUp>,
    private readonly doctorService: DoctorService,
    private readonly transcriptionService: TranscriptionService,
    @Inject(forwardRef(() => MedicalRecordService))
    private readonly medicalRecordService: MedicalRecordService,
  ) {}
  async create(
    createMedicalCheckUpDto: CreateMedicalCheckUpDto,
  ): Promise<MedicalCheckUp> {
    const {
      additionalInformation,
      doctorId,
      medicamentNameList,
      patientId,
      namesOfChronicDiseases,
      remarks,
      controlDate,
    } = createMedicalCheckUpDto;
    const medicalCheckUp = await this.medicalCheckUpRepository.create({});
    medicalCheckUp.controlDate = controlDate;
    /********* Create Transcription */
    const transcription =
      await this.transcriptionService.createForMedicalCheckUp(
        medicamentNameList,
        remarks,
      );
    medicalCheckUp.transcription = transcription;
    medicalCheckUp.additionalInformation = additionalInformation;
    /************ Assign to a doctor */
    const doctor = await this.doctorService.findOne(doctorId);
    medicalCheckUp.doctor = doctor;
    /************ Assign to medical Record */
    let medicalRecord =
      await this.medicalRecordService.findMedicalRecordByPatientId(patientId);
    medicalRecord = await this.medicalRecordService.assignChronicDiseases(
      medicalRecord.id,
      namesOfChronicDiseases,
    );
    medicalCheckUp.medicalRecord = medicalRecord;
    /************* Save to Database */
    return this.medicalCheckUpRepository.save(medicalCheckUp);
  }

  async findAll(): Promise<MedicalCheckUp[]> {
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
  // async update(
  //   id: number,
  //   updateMedicalCheckUpDto: UpdateMedicalCheckUpDto,
  // ): Promise<MedicalCheckUp> {
  //   const medicalCheckUp = await this.findOne(id);
  //   medicalCheckUp.additionalInformation =
  //     updateMedicalCheckUpDto.additionalInformation;
  //   return this.medicalCheckUpRepository.save(medicalCheckUp);
  // }

  async softDelete(id: number) {
    return this.medicalCheckUpRepository.softDelete(id);
  }

  async restore(id: number) {
    return this.medicalCheckUpRepository.restore(id);
  }

  async findAllByPatientId(patientId: number) {
    const medicalRecord =
      await this.medicalRecordService.findMedicalRecordByPatientId(patientId);
    return await this.medicalCheckUpRepository
      .createQueryBuilder('medicalCheckUp')
      .leftJoinAndSelect('medicalCheckUp.medicalRecord', 'medicalRecord')
      .leftJoinAndSelect('medicalCheckUp.doctor', 'doctor')
      .leftJoinAndSelect('medicalCheckUp.transcription', 'transcription')
      .where('medicalCheckUp.medicalRecord.id = :medicalRecordId', {
        medicalRecordId: medicalRecord.id,
      })
      .getMany();
  }

  async extractTranscriptions(medicalCheckUps: MedicalCheckUp[]) {
    const transcriptions = [];
    for (let i = 0; i < medicalCheckUps.length; i++) {
      const transcription = await this.transcriptionService.findOne(
        medicalCheckUps[i].transcription.id,
      );
      transcriptions.push(transcription);
    }
    return transcriptions;
  }

  async findAllByDoctorId(doctorId: number) {
    return await this.medicalCheckUpRepository
      .createQueryBuilder('medicalCheckUp')
      .leftJoinAndSelect('medicalCheckUp.medicalRecord', 'medicalRecord')
      .leftJoinAndSelect('medicalCheckUp.doctor', 'doctor')
      .leftJoinAndSelect('medicalCheckUp.transcription', 'transcription')
      .where('medicalCheckUp.doctor.id = :doctorId', {
        doctorId,
      })
      .getMany();
  }

  async buildMedicalRecord(patientId: number) {
    return this.medicalCheckUpRepository
      .createQueryBuilder('medicalCheckUp')
      .leftJoinAndSelect('medicalCheckUp.medicalRecord', 'medicalRecord')
      .leftJoinAndSelect('medicalRecord.patient', 'patient')
      .leftJoinAndSelect('medicalCheckUp.transcription', 'transcription')
      .where('medicalRecord.patient.id = :patientId', { patientId })
      .getOne();
  }
}
