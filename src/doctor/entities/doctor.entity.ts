import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserDetail } from '../../user-details/entities/user-detail.entity';

@Entity()
export class Doctor {
  @OneToOne(() => UserDetail, (userDetail) => userDetail.doctor, {
    primary: true,
    cascade: true,
  })
  @JoinColumn()
  userDetail: UserDetail;

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
