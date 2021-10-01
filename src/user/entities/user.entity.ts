import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './gender.entity';

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

  @Column()
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

  @Column()
  password: string;
}
