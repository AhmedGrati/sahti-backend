import { ErrorType } from 'src/generics/error-type.enum';

export function generateBasicErrorMessage(
  className: any,
  errorType: ErrorType,
): string {
  if (errorType == ErrorType.NOT_FOUND) {
    return `${className} Not Found!`;
  }
}
