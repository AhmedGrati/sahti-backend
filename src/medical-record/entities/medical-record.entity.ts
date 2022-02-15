import { ChronicDisease } from 'src/chronic-disease/entities/chronic-disease.entity';
import { Patient } from 'src/patient/entities/patient.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @OneToOne(() => Patient, (patient) => patient.medicalRecord, { eager: true })
  @JoinColumn()
  patient: Patient;

  @ManyToMany(
    () => ChronicDisease,
    (chronicDisease) => chronicDisease.medicalRecords,
    { eager: true },
  )
  @JoinTable()
  chronicDiseases: ChronicDisease[];
}
