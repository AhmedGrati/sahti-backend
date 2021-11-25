import { Doctor } from '../../doctor/entities/doctor.entity';
import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Transcription } from '../../transcription/entities/transcription.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from 'src/patient/entities/patient.entity';

@Entity()
export class MedicalCheckUp extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  additionalInformation: string;

  @ManyToOne(() => Doctor)
  doctor: Doctor;

  @ManyToOne(() => Patient)
  patient: Patient;

  @OneToOne(
    () => Transcription,
    (transcription) => transcription.medicalCheckUp,
  )
  transcription: Transcription;
}
