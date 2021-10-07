import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDetailDto } from './create-user-detail.dto';

export class UpdateUserDetailDto extends PartialType(CreateUserDetailDto) {}
