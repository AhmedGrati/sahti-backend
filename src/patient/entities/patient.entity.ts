import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CivilStatusEnum } from './civil-status.enum';
import { UserDetail } from '../../user-details/entities/user-detail.entity';
import { Transcription } from 'src/transcription/entities/transcription.entity';

@Entity()
export class Patient {
  @OneToOne(() => UserDetail, (userDetail) => userDetail.patient, {
    primary: true,
    cascade: true,
  })
  @JoinColumn()
  userDetail: UserDetail;
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

  @OneToMany(() => Transcription, (transcription) => transcription.patient)
  transcriptions: Transcription[];
}
