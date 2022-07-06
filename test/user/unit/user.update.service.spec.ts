import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import CreateUserDto from '../../../src/dto/user/create-user.dto';
import { createOneUser } from '../../utils/factory/user.factory';
import UserService from '../../../src/service/user/user.service';
import User from '../../../src/entities/user/user.entity';
import userRepositoryMock from '../../utils/mocks/user.repository.mock';

describe('src :: service :: UserService() :: update', () => {
  describe('GIVEN a mocked repository with 10 users', () => {
    let service: UserService;
    const userFactory = createOneUser();
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

    describe('WHEN update a existing user', () => {
      let updatedUser: CreateUserDto;
      beforeEach(async () => {
        updatedUser = await service.update('1', userFactory);
      });
      it('THEN it should return the object with a id', () => {
        expect(updatedUser).toBeDefined();
        expect(updatedUser).toHaveProperty('id');
        expect(updatedUser.id).toBeDefined();
        expect(updatedUser.id).toBe('1');
        expect(updatedUser).toHaveProperty('name');
        expect(updatedUser).toHaveProperty('email');
        expect(updatedUser).toHaveProperty('address');
        expect(updatedUser).toHaveProperty('city');
        expect(updatedUser).toHaveProperty('state');
        expect(updatedUser).toHaveProperty('country');
        expect(updatedUser).toHaveProperty('zipCode');
        expect(updatedUser).toHaveProperty('cpf');
        expect(updatedUser).toHaveProperty('birthday');
      });
    });

    describe('WHEN updating for a user that dont exist', () => {
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
