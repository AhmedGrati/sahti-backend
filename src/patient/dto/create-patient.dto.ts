import { CivilStatusEnum } from '../entities/civil-status.enum';
import { CreateUserDetailDto } from '../../user-details/dto/create-user-detail.dto';

export class CreatePatientDto {
  userDetail: CreateUserDetailDto;

  cnamId: number;

  civilStatus: CivilStatusEnum; //todo change enum married divorced  ...

  socialStatus: string;
}
