import { Doctor } from 'src/doctor/entities/doctor.entity';
import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class MedicalCheckUp extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  additionalInformation: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.medicalCheckUps)
  doctor: Doctor;
}
