import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import CreateUserDto from '../../../src/dto/user/create-user.dto';
import { createOneUser } from '../../utils/factory/user.factory';
import UserService from '../../../src/service/user/user.service';
import User from '../../../src/entities/user/user.entity';
import userRepositoryMock from '../../utils/mocks/user.repository.mock';

describe('src :: service :: UserService() :: create', () => {
  describe('GIVEN a mocked repository with ZERO users', () => {
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

    describe('WHEN adding a valid user', () => {
      let createdUser: CreateUserDto;
      beforeEach(async () => {
        createdUser = await service.create(userFactory);
      });
      it('THEN it should return the object with a id', () => {
        expect(createdUser).toBeDefined();
        expect(createdUser).toHaveProperty('id');
        expect(createdUser.id).toBeDefined();
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
  });
});
