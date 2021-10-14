import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Medicament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
