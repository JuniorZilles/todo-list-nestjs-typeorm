import { Test, TestingModule } from '@nestjs/testing';
import CreateUserDto from '../../../src/dto/user/create-user.dto';
import UserService from '../../../src/service/user/user.service';
import User from '../../../src/entities/user/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userRepositoryMock } from '../../utils/mocks/user.repository.mock';
import { NotFoundException } from '@nestjs/common';

describe('src :: service :: UserService() :: findOne', () => {
  describe('GIVEN a mocked repository with 10 users', () => {
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

    describe('WHEN searching for a user', () => {
      let createdUser: CreateUserDto;
      beforeEach(async () => {
        createdUser = await service.findOne('1');
      });
      it('THEN it should return the object with a id', () => {
        expect(createdUser).toBeDefined();
        expect(createdUser).toHaveProperty('id');
        expect(createdUser.id).toBeDefined();
        expect(createdUser.id).toBe('1');
        expect(createdUser).toHaveProperty('name');
        expect(createdUser).toHaveProperty('email');
        expect(createdUser).not.toHaveProperty('password');
        expect(createdUser).toHaveProperty('address');
        expect(createdUser).toHaveProperty('city');
        expect(createdUser).toHaveProperty('state');
        expect(createdUser).toHaveProperty('country');
        expect(createdUser).toHaveProperty('zipCode');
        expect(createdUser).toHaveProperty('cpf');
        expect(createdUser).toHaveProperty('birthday');
      });
    });

    describe('WHEN searching for a user that dont exist', () => {
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
