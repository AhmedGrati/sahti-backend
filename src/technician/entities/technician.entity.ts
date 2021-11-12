import { ChildEntity, Column, Entity } from 'typeorm';
import { OfficeFieldEnum } from './office-field.enum';
import { Patient } from '../../patient/entities/patient.entity';

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
}
