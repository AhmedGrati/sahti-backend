import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { CivilStatusEnum } from './civil-status.enum';
import { Gender } from './gender.entity';
import { classToPlain, Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { RoleEnum } from './role.enum';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({
    nullable: false,
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.PATIENT,
  })
  role: RoleEnum;

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

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  toJSON() {
    return classToPlain(this);
  }
}
