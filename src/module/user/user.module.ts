import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserService from '../../service/user/user.service';
import UserController from '../../controller/user/user.controller';
import User from '../../entities/user/user.entity';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([Repository<User>])]
})
export default class UserModule {}
