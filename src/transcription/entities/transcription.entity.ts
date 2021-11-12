import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Medicament } from 'src/medicament/entities/medicament.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TranscriptionStatus } from './transcription-status';

@Entity()
export class Transcription extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  additionalInformation: string;

  @Column({
    type: 'enum',
    enum: TranscriptionStatus,
    default: TranscriptionStatus.NOT_CHECKED,
  })
  status: TranscriptionStatus;

  @ManyToMany(() => Medicament, (medicament) => medicament.transcriptions)
  @JoinTable()
  medicaments: Medicament[];

  @ManyToOne(() => Patient, (patient) => patient.transcriptions)
  patient: Patient;
}