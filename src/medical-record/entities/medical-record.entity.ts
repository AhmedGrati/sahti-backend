import { Patient } from 'src/patient/entities/patient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BloodType } from './blood-type.enum';

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: BloodType,
  })
  bloodType: BloodType;

  @OneToOne(() => Patient, (patient) => patient.medicalRecord)
  @JoinColumn()
  patient: Patient;
}
