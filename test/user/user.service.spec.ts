import { Test, TestingModule } from '@nestjs/testing';
import CreateUserDto from 'src/dto/user/create-user.dto';
import { createOneUser } from 'test/utils/factory/user.factory';
import UserService from '../../src/service/user/user.service';

describe('src :: service :: UserService()', () => {
  describe('GIVEN a mocked repository with ZERO users', () => {
    let service: UserService;
    const userFactory = createOneUser();
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [UserService]
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
      });
    });
  });
});
