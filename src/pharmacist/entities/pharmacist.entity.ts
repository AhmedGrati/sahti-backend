import { TimestampEntites } from 'src/generics/timestamp.entity';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';
import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { UserDetail } from '../../user-details/entities/user-detail.entity';

@Entity()
export class Pharmacist extends TimestampEntites {
  @OneToOne(() => UserDetail, (userDetail) => userDetail.pharmacist, {
    primary: true,
    cascade: true,
  })
  @JoinColumn()
  userDetail: UserDetail;

  @ManyToOne(() => Pharmacy, (pharmacy) => pharmacy.pharmacists)
  pharmacy: Pharmacy;
}
