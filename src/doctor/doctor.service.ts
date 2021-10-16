import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { UserDetailsService } from '../user-details/user-details.service';
import { PatientService } from '../patient/patient.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(
    private readonly userDetailsService: UserDetailsService,
    private readonly patientService: PatientService,
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) {}
  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const userDetail = await this.userDetailsService.findOne(
      createDoctorDto.userDetailId,
    );
    if (!userDetail) {
      throw new HttpException(
        'The User Details Provided Dosent Exists',
        HttpStatus.NOT_FOUND,
      );
    }
    const doctor = await this.doctorRepository.create(createDoctorDto);
    doctor.userDetail = userDetail;
    return this.doctorRepository.save(doctor);
  }

  findAll() {
    return `This action returns all doctor`;
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }
}
