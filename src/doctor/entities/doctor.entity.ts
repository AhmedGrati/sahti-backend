import { ChildEntity, Column, Entity } from 'typeorm';
import { Patient } from '../../patient/entities/patient.entity';

@Entity()
@ChildEntity()
export class Doctor extends Patient {
  @Column()
  doctorNumber: number;

  @Column()
  grade: string; //todo change to enum : docteur aggreges specialiste generaliste resident externe ....

  @Column({ nullable: true })
  speciality: string;

  @Column({ nullable: true })
  serviceHospital: string;

  @Column({ nullable: true })
  officeLocalisation: string;
}
