import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../patient/entities/role.enum';

export const Roles = (roles: RoleEnum[]) => SetMetadata('roles', roles);
