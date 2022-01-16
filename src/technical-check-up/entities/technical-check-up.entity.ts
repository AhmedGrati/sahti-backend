import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntites } from '../../generics/timestamp.entity';
import { TechnicalFile } from '../../file/entities/technical-file.entity';
import { Technician } from '../../technician/entities/technician.entity';
import { MedicalRecord } from '../../medical-record/entities/medical-record.entity';

@Entity()
export class TechnicalCheckUp extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  additionalInformation: string;
  @OneToMany(
    () => TechnicalFile,
    (technicalFile) => technicalFile.technicalCheckUp,
    { eager: true },
  )
  technicalFiles: TechnicalFile[];

  @ManyToOne(() => Technician, (technician) => technician.technicalCheckUp, {
    eager: true,
  })
  technician: Technician;

  @ManyToOne(() => MedicalRecord, { eager: true })
  medicalRecord: MedicalRecord;
}
