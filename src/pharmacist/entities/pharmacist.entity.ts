import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';
import { ChildEntity, Column, Entity, ManyToOne } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';

@Entity()
@ChildEntity()
export class Pharmacist extends Patient {
  @Column()
  pharmacyLocalisation: string;
  
  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.pharmacists)
  pharmacy: Pharmacy;
}
