import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicament extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
