import { Module } from '@nestjs/common';
import TaskService from '../../service/task/task.service';
import TaskController from '../../controller/task/task.controller';

@Module({
  controllers: [TaskController],
  providers: [TaskService]
})
export default class TaskModule {}
