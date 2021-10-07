import {
  BeforeInsert,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Gender } from './gender.entity';
import { Technician } from '../../technician/entities/technician.entity';
import { Pharmacist } from '../../pharmacist/entities/pharmacist.entity';
import { Patient } from '../../patient/entities/patient.entity';
import { Doctor } from '../../doctor/entities/doctor.entity';

@Entity()
export class UserDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthday: Date;
  @Column({ unique: true })
  email: string;

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
  password: string;

  @OneToOne(() => Technician, (technician) => technician.userDetail)
  technician: Technician;

  @OneToOne(() => Pharmacist, (pharmacist) => pharmacist.userDetail)
  pharmacist: Pharmacist;

  @OneToOne(() => Patient, (patient) => patient.userDetail)
  patient: Patient;

  @OneToOne(() => Doctor, (doctor) => doctor.userDetail)
  doctor: Doctor;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
  }
}
