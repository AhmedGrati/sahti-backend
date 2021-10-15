import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Transcription } from 'src/transcription/entities/transcription.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicament extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Transcription, (transcription) => transcription.medicaments)
  transcriptions: Transcription[];
}
