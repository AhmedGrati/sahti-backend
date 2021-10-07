import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { OfficeFieldEnum } from './office-field.enum';
import { UserDetail } from '../../user-details/entities/user-detail.entity';

@Entity()
export class Technician {
  @OneToOne(() => UserDetail, (userDetail) => userDetail.technician, {
    primary: true,
    cascade: true,
  })
  @JoinColumn()
  userDetail: UserDetail;
  @Column()
  officeLocalisation: string;

  @Column({
    type: 'enum',
    enum: OfficeFieldEnum,
  })
  officeType: OfficeFieldEnum;

  @Column()
  workField: string;
}
