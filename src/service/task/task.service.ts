import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Task from '../../entities/task/task.entity';
import CreateTaskDto from '../../dto/task/create-task.dto';
import CustomRepository from '../../repository/repository';
import SearchTaskDto from '../../dto/task/search-task.dto';
import ListTaskDto from '../../dto/task/list-task.dto';

@Injectable()
export default class TaskService {
  private repository: CustomRepository<Task, CreateTaskDto, SearchTaskDto>;

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {
    this.repository = new CustomRepository(this.taskRepository);
  }

  async create(createTaskDto: CreateTaskDto) {
    const result = await this.repository.create(createTaskDto);
    return result;
  }

  async findAll(payload: SearchTaskDto): Promise<ListTaskDto> {
    const result = await this.repository.findAll(payload);
    return { tasks: result.items, meta: result.meta };
  }

  async findOne(id: string) {
    const result = await this.repository.findOne(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  async update(id: string, updateTaskDto: CreateTaskDto) {
    const result = await this.repository.update(id, updateTaskDto);
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
