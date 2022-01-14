import { ApiProperty } from '@nestjs/swagger';

export class CreatePharmacyDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  localization: string;
  @ApiProperty()
  phone: string;
}
