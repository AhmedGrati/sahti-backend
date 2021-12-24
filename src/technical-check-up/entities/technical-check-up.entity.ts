import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntites } from '../../generics/timestamp.entity';
import { TechnicalFile } from '../../file/entities/technical-file.entity';
@Entity()
export class TechnicalCheckUp extends TimestampEntites {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  additionalInformation: string;
  @OneToMany(
    () => TechnicalFile,
    (technicalFile) => technicalFile.technicalCheckUp,
  )
  technicalFiles: TechnicalFile[];
}
