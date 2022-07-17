import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import CreateUserDto from '../../../src/dto/user/create-user.dto';
import UserService from '../../../src/service/user/user.service';
import User from '../../../src/entities/user/user.entity';
import userRepositoryMock from '../../utils/mocks/user.repository.mock';

describe('src :: service :: UserService() :: delete', () => {
  describe('GIVEN a mocked repository with 10 existing users', () => {
    let service: UserService;
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UserService,
          {
            provide: getRepositoryToken(User),
            useFactory: userRepositoryMock
          }
        ]
      }).compile();

      service = module.get<UserService>(UserService);
    });

    describe('WHEN removing a existing user', () => {
      let createdUser: CreateUserDto;
      beforeEach(async () => {
        createdUser = await service.remove('1');
      });
      it('THEN it should return the object with a id', () => {
        expect(createdUser).toBeDefined();
        expect(createdUser).toHaveProperty('id');
        expect(createdUser.id).toBeDefined();
        expect(createdUser.id).toBe('1');
      });
    });

    describe('WHEN removing a user that doesnt exists', () => {
      it('THEN it should throw a not found exception', async () => {
        try {
          await service.remove('12');
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect((<NotFoundException>e).name).toBe('NotFoundException');
        }
      });
    });
  });
});
