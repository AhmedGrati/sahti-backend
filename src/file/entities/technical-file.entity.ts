import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TechnicalCheckUp } from '../../technical-check-up/entities/technical-check-up.entity';

@Entity()
export class TechnicalFile {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public url: string;

  @Column()
  public key: string;
  @ManyToOne(
    () => TechnicalCheckUp,
    (technicalCheckUp) => technicalCheckUp.technicalFiles,
  )
  technicalCheckUp: TechnicalCheckUp;
}
