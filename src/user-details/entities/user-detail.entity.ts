import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Patient } from '../../patient/entities/patient.entity';
import { RoleEnum } from './role.enum';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { classToPlain, Exclude } from 'class-transformer';
@UseInterceptors(ClassSerializerInterceptor)
@Entity()
export class UserDetail {
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

  @OneToOne(() => Patient, (patient) => patient.userDetail)
  patient: Patient;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
  toJSON() {
    return classToPlain(this);
  }
}
