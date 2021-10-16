import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTechnicianDto } from './dto/create-technician.dto';
import { UpdateTechnicianDto } from './dto/update-technician.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Technician } from './entities/technician.entity';
import { UserDetailsService } from '../user-details/user-details.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class TechnicianService {
  constructor(
    private readonly userDetailsService: UserDetailsService,
    private readonly patientService: PatientService,
    @InjectRepository(Technician)
    private readonly technicianRepository: Repository<Technician>,
  ) {}
  async create(createTechnicianDto: CreateTechnicianDto): Promise<Technician> {
    // const userDetail = await this.userDetailsService.findOne(
    //   createTechnicianDto.userDetailsId,
    // );
    // if (!userDetail) {
    //   throw new HttpException(
    //     'The User Details Provided Dosent Exists',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    // const technician = await this.technicianRepository.create(
    //   createTechnicianDto,
    // );
    // technician.userDetail = userDetail;
    // return this.technicianRepository.save(technician);
    const userDetail = await this.userDetailsService.findOne(
      createTechnicianDto.userDetailId,
    );
    if (!userDetail) {
      throw new HttpException(
        'The User Details Provided Dosent Exists',
        HttpStatus.NOT_FOUND,
      );
    }
    const technician = await this.technicianRepository.create(
      createTechnicianDto,
    );
    technician.userDetail = userDetail;
    return this.technicianRepository.save(technician);
  }

  findAll() {
    return `This action returns all technician`;
  }

  findOne(id: number) {
    return `This action returns a #${id} technician`;
  }

  update(id: number, updateTechnicianDto: UpdateTechnicianDto) {
    return `This action updates a #${id} technician`;
  }

  remove(id: number) {
    return `This action removes a #${id} technician`;
  }
}
