import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntites } from '../../generics/timestamp.entity';
import { TechnicalFile } from '../../file/entities/technical-file.entity';

export class TechnicalCheckUp extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  additionalInformation: string;
  @JoinColumn()
  @OneToOne(() => TechnicalFile, {
    eager: true,
    nullable: true,
  })
  public technicalFile: TechnicalFile;
}
