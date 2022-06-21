import { Module } from '@nestjs/common';
import UserService from '../../service/user/user.service';
import UserController from '../../controller/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
})
export default class UserModule {}
