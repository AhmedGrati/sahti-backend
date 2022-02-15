import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalCheckUpDto {
  @ApiProperty()
  additionalInformation: string;
  @ApiProperty()
  doctorId: number;
  @ApiProperty()
  patientId: number;
  @ApiProperty()
  namesOfChronicDiseases: string[];

  @ApiProperty()
  controlDate: Date;

  @ApiProperty()
  medicamentNameList: string[];

  @ApiProperty()
  remarks: string;
}
