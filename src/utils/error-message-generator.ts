import { Role } from 'src/generics/role.enum';

export function generateNotFoundErrorMessage(className: any): string {
  return `${className} Not Found!`;
}

export function generateUnauthorizedErrorMessage(
  unauthorizedUser: { id: number; role: Role },
  resource: { id: number; name: string },
): string {
  return `The ${unauthorizedUser.role} with id ${unauthorizedUser.id} is unauthorized to access ${resource.name} with id ${resource.id}`;
}
