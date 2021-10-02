import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './gender.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
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

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    console.log(this.password);
  }
}
