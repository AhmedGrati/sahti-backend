import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserDetail } from '../../user-details/entities/user-detail.entity';

@Entity()
export class Pharmacist {
  @OneToOne(() => UserDetail, (userDetail) => userDetail.pharmacist, {
    primary: true,
    cascade: true,
  })
  @JoinColumn()
  userDetail: UserDetail;
  @Column()
  pharmacyLocalisation: string;
}
