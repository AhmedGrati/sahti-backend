import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pharmacy extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  localization: string;

  @Column({ nullable: false })
  phone: string;
}
