import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import CreateUserDto from '../../../src/dto/user/create-user.dto';
import UserService from '../../../src/service/user/user.service';
import User from '../../../src/entities/user/user.entity';
import userRepositoryMock from '../../utils/mocks/user.repository.mock';

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
      let foundUser: CreateUserDto;
      beforeEach(async () => {
        foundUser = await service.findOne('1');
      });
      it('THEN it should return the object with a id', () => {
        expect(foundUser).toBeDefined();
        expect(foundUser).toHaveProperty('id');
        expect(foundUser.id).toBeDefined();
        expect(foundUser.id).toBe('1');
        expect(foundUser).toHaveProperty('name');
        expect(foundUser).toHaveProperty('email');
        expect(foundUser).not.toHaveProperty('password');
        expect(foundUser).toHaveProperty('address');
        expect(foundUser).toHaveProperty('city');
        expect(foundUser).toHaveProperty('state');
        expect(foundUser).toHaveProperty('country');
        expect(foundUser).toHaveProperty('zipCode');
        expect(foundUser).toHaveProperty('cpf');
        expect(foundUser).toHaveProperty('birthday');
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
