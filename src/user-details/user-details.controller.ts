import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserDetailsService } from './user-details.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';

@Controller('user-details')
export class UserDetailsController {
  constructor(private readonly userDetailsService: UserDetailsService) {}

  @Post()
  create(@Body() createUserDetailDto: CreateUserDetailDto) {
    return this.userDetailsService.create(createUserDetailDto);
  }

  @Get()
  findAll() {
    return this.userDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDetailDto: UpdateUserDetailDto,
  ) {
    return this.userDetailsService.update(+id, updateUserDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDetailsService.remove(+id);
  }
}
