import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Task from '../../entities/task/task.entity';
import { Repository } from 'typeorm';
import CreateTaskDto from '../../dto/task/create-task.dto';
import UpdateTaskDto from '../../dto/task/update-task.dto';

@Injectable()
export default class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
