import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TrimDataPipe implements PipeTransform<any, any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (value) {
      const { email } = value;
      if (email) {
        value.email = value.email?.trim().toLowerCase();
      }
      return value;
    }
  }
}
