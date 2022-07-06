import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from '../../entities/user/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from '../../dto/user/create-user.dto';
import CustomRepository from '../../repository/repository';
import SearchUserDto from '../../dto/user/search-user.dto';
import ListUserDto from 'src/dto/user/list-user.dto';

@Injectable()
export default class UserService {
  private repository: CustomRepository<User, CreateUserDto, SearchUserDto>;
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

  async findAll(payload: SearchUserDto): Promise<ListUserDto> {
    const result = await this.repository.findAll(payload);
    return { users: result.items, meta: result.meta };
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
