import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Pharmacy } from '../pharmacy/entities/pharmacy.entity';
import { Repository } from 'typeorm';
import { TechnicalFile } from './entities/technical-file.entity';
import { Buffer } from 'buffer';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(Pharmacy)
    private readonly technicalFileRepository: Repository<TechnicalFile>,
    private readonly configService: ConfigService,
  ) {}
  s3 = new AWS.S3({
    accessKeyId: this.configService.get('AWS_ID'),
    secretAccessKey: this.configService.get('AWS_SECRET'),
  });
  async uploadFile(dataBuffer: Buffer, filename: string) {
    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        Body: dataBuffer,
        Key: `${uuid()}-${filename}`,
      })
      .promise();

    const newFile = this.technicalFileRepository.create({
      key: uploadResult.Key,
      url: uploadResult.Location,
    });
    await this.technicalFileRepository.save(newFile);
    return newFile;
  }
}
