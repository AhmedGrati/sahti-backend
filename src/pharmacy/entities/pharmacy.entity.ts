import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Pharmacist } from 'src/pharmacist/entities/pharmacist.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Pharmacist, (pharmacist) => pharmacist.pharmacy)
  pharmacists: Pharmacist[];
}
