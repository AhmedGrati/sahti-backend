import { MedicalRecord } from 'src/medical-record/entities/medical-record.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChronicDisease {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => MedicalRecord,
    (medicalRecord) => medicalRecord.chronicDiseases,
  )
  medicalRecords: MedicalRecord[];
}
