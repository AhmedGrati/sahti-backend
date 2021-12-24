import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TechnicalFile } from './entities/technical-file.entity';
import { Buffer } from 'buffer';
import { v4 as uuid } from 'uuid';
import { TechnicalFileDto } from './dto/technical-file.dto';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(TechnicalFile)
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
  async uploadFiles(files: TechnicalFileDto[]) {
    const technicalFiles: TechnicalFile[] = [];
    for (const file of files) {
      const technicalFile = await this.uploadFile(
        file.dataBuffer,
        file.filename,
      );
      technicalFiles.push(technicalFile);
    }
    return technicalFiles;
  }
}
