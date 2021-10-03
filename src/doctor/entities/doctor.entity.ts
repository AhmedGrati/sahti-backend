import { ChildEntity, Column } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@ChildEntity()
export class Doctor extends User {
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

  @Column({ nullable: true })
  cnamId: number;
}
