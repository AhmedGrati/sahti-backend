import { ChildEntity, Column } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CivilStatusEnum } from './civil-status.enum';

@ChildEntity()
export class Patient extends User {
  @Column({ nullable: true })
  cnamId: number;

  @Column({
    type: 'enum',
    enum: CivilStatusEnum,
    default: CivilStatusEnum.SINGLE,
  })
  civilStatus: CivilStatusEnum; //todo change enum married divorced  ...

  @Column()
  socialStatus: string; //student working etc
}
