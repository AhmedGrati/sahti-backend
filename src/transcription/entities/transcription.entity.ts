import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Medicament } from 'src/medicament/entities/medicament.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transcription extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  additionalInformation: string;

  @ManyToMany(() => Medicament, (medicament) => medicament.transcriptions)
  @JoinTable()
  medicaments: Medicament[];
}
