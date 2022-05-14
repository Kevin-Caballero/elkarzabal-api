import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FindManyOptions } from 'typeorm';
import { FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findAll(findManyOptions?: FindManyOptions) {
    return this.userRepository.find(findManyOptions);
  }

  findOne(findOneOptions: FindOneOptions): Promise<User> {
    return this.userRepository.findOne(findOneOptions);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id: id } });
  }
}
