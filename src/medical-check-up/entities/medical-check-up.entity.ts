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
import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';

@Entity()
export class MedicalCheckUp extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  additionalInformation: string;
  @ManyToOne(() => Doctor, { eager: true })
  doctor: Doctor;

  @ManyToOne(() => MedicalRecord, { eager: true })
  medicalRecord: MedicalRecord;

  @OneToOne(
    () => Transcription,
    (transcription) => transcription.medicalCheckUp,
    { eager: true },
  )
  transcription: Transcription;

  @Column()
  controlDate: Date;
}
