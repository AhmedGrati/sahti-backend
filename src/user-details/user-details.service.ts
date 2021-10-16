import { Injectable } from '@nestjs/common';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserDetail } from './entities/user-detail.entity';

@Injectable()
export class UserDetailsService {
  constructor(
    @InjectRepository(UserDetail)
    private readonly userDetailRepository: Repository<UserDetail>,
  ) {}
  async create(createUserDetailDto: CreateUserDetailDto): Promise<UserDetail> {
    const userDetail = await this.userDetailRepository.create(
      createUserDetailDto,
    );
    return this.userDetailRepository.save(userDetail);
  }

  async findAll(): Promise<UserDetail[]> {
    return this.userDetailRepository.find();
  }

  async findOne(id: number): Promise<UserDetail> {
    return this.userDetailRepository.findOne(id);
  }

  async update(
    id: number,
    updateUserDetailDto: UpdateUserDetailDto,
  ): Promise<UserDetail> {
    const userDetail = await this.userDetailRepository.preload({
      id,
      ...updateUserDetailDto,
    });
    return this.userDetailRepository.save(userDetail);
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userDetailRepository.delete(id);
  }
  async userExistsByEmail(userEmail: string): Promise<boolean> {
    const userDetail = await this.userDetailRepository.findOne({
      where: { email: userEmail },
    });
    return userDetail != null;
  }
  async findByEmail(userEmail: string): Promise<UserDetail> {
    const userDetail = await this.userDetailRepository.findOne({
      where: { email: userEmail },
    });
    return userDetail;
  }
  async markEmailAsConfirmed(userEmail: string): Promise<UserDetail> {
    const user = await this.findByEmail(userEmail);
    user.isEmailVerified = true;
    return this.userDetailRepository.save(user);
  }
}
