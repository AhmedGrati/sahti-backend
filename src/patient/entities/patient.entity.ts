import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  TableInheritance,
} from 'typeorm';
import { CivilStatusEnum } from './civil-status.enum';
import { UserDetail } from '../../user-details/entities/user-detail.entity';
import { Gender } from './gender.entity';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Patient {
  @OneToOne(() => UserDetail, (userDetail) => userDetail.patient, {
    primary: true,
    cascade: true,
  })
  @JoinColumn()
  userDetail: UserDetail;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthday: Date;

  @Column({ unique: true })
  cin: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
  })
  gender: Gender;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: false })
  cnamId: number;

  @Column({
    type: 'enum',
    enum: CivilStatusEnum,
    default: CivilStatusEnum.SINGLE,
  })
  civilStatus: CivilStatusEnum;

  @Column()
  socialStatus: string; //student working etc
}
