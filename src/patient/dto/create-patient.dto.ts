import { CivilStatusEnum } from '../entities/civil-status.enum';

export class CreatePatientDto {
  userDetailsId: number;

  cnamId: number;

  civilStatus: CivilStatusEnum; //todo change enum married divorced  ...

  socialStatus: string;
}
