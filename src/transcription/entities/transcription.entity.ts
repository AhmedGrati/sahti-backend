import { TimestampEntites } from 'src/generics/timestamp.entity';
import { MedicalCheckUp } from 'src/medical-check-up/entities/medical-check-up.entity';
import { Medicament } from 'src/medicament/entities/medicament.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TranscriptionStatus } from './transcription-status';

@Entity()
export class Transcription extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  remarks: string;

  @Column({
    type: 'enum',
    enum: TranscriptionStatus,
    default: TranscriptionStatus.NOT_CHECKED,
  })
  status: TranscriptionStatus;

  @ManyToMany(() => Medicament, (medicament) => medicament.transcriptions, {
    eager: true,
  })
  @JoinTable()
  medicaments: Medicament[];

  @OneToOne(
    () => MedicalCheckUp,
    (medicalCheckUp) => medicalCheckUp.transcription,
  )
  @JoinColumn()
  medicalCheckUp: MedicalCheckUp;
}
