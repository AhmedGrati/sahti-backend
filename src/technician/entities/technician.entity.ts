import { ChildEntity, Column, Entity, OneToMany } from 'typeorm';
import { OfficeFieldEnum } from './office-field.enum';
import { Patient } from '../../patient/entities/patient.entity';
import { TechnicalCheckUp } from '../../technical-check-up/entities/technical-check-up.entity';

@Entity()
@ChildEntity()
export class Technician extends Patient {
  @Column()
  officeLocalisation: string;

  @Column({
    type: 'enum',
    enum: OfficeFieldEnum,
  })
  officeType: OfficeFieldEnum;

  @Column()
  workField: string;

  @OneToMany(
    () => TechnicalCheckUp,
    (technicalCheckUp) => technicalCheckUp.technician,
    // { eager: true },
  )
  technicalCheckUp: TechnicalCheckUp[];
}
