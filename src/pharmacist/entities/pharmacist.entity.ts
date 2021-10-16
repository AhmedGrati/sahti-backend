import { ChildEntity, Column, Entity } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';

@Entity()
@ChildEntity()
export class Pharmacist extends Patient {
  @Column()
  pharmacyLocalisation: string;
}
