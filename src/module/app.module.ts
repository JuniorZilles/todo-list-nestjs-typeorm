import { Module } from '@nestjs/common';
import DatabaseModule from './database/database.module';
import TaskModule from './task/task.module';
import UserModule from './user/user.module';

@Module({
  imports: [DatabaseModule, UserModule, TaskModule]
})
export default class AppModule {}
