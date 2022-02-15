import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../patient/entities/role.enum';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<RoleEnum[]>('roles', context.getHandler());
    if (!roles || roles.length == 0) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user.role);
  }
  matchRoles(roles: RoleEnum[], role: string): boolean {
    const roleEnum = RoleEnum[role.toUpperCase()];
    console.log(roleEnum);
    return roles.includes(roleEnum);
  }
}
