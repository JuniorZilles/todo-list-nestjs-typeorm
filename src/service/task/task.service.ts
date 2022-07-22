import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from '../../entities/task/task.entity';
import CreateTaskDto from '../../dto/task/create-task.dto';
import CustomRepository from '../../repository/repository';
import SearchTaskDto from '../../dto/task/search-task.dto';
import ListTaskDto from '../../dto/task/list-task.dto';
import User from '../../entities/user/user.entity';
import CreateUserDto from '../../dto/user/create-user.dto';
import SearchUserDto from '../../dto/user/search-user.dto';

@Injectable()
export default class TaskService {
  private repositoryTask: CustomRepository<Task, CreateTaskDto, SearchTaskDto>;

  private repositoryUser: CustomRepository<User, CreateUserDto, SearchUserDto>;

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    this.repositoryTask = new CustomRepository(this.taskRepository);
    this.repositoryUser = new CustomRepository(this.userRepository);
  }

  async getUser(id: string) {
    const user = await this.repositoryUser.findOne({ id });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async create(createTaskDto: CreateTaskDto) {
    const user = await this.getUser(createTaskDto.userId);
    const result = await this.repositoryTask.create({ ...createTaskDto, user });
    return result;
  }

  async findAll(payload: SearchTaskDto): Promise<ListTaskDto> {
    const result = await this.repositoryTask.findAll(payload);
    return { tasks: result.items, meta: result.meta };
  }

  async findOne(id: string) {
    const result = await this.repositoryTask.findOne({ id });
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }

  async update(id: string, updateTaskDto: CreateTaskDto) {
    const user = await this.getUser(updateTaskDto.userId);
    const result = await this.repositoryTask.update(id, { ...updateTaskDto, user });
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }

  async remove(id: string) {
    const result = await this.repositoryTask.remove(id);
    if (!result) {
      throw new NotFoundException('Task not found');
    }
    return result;
  }
}
