import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Task from '../../entities/task/task.entity';
import User from '../../entities/user/user.entity';
import TaskController from '../../controller/task/task.controller';
import TaskService from '../../service/task/task.service';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [TypeOrmModule.forFeature([Task, User])]
})
export default class TaskModule {}
