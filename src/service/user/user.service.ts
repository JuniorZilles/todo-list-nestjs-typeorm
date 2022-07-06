import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from '../../dto/user/create-user.dto';
import CustomRepository from '../../repository/repository';

@Injectable()
export default class UserService {
  private repository: CustomRepository<User, CreateUserDto>;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    this.repository = new CustomRepository(this.userRepository);
  }

  async create(createUserDto: CreateUserDto) {
    const result = await this.repository.create(createUserDto);
    return result;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const result = await this.repository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(id: string, updateUserDto: CreateUserDto) {
    const result = await this.repository.update(id, updateUserDto);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.repository.remove(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }
}
