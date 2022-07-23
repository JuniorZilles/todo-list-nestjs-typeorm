import { Repository } from 'typeorm';
import { createManyUser } from '../factory/user.factory';
import { MockType } from '../mock.type';

const userRepositoryMock: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(({ where }) => {
    const users = createManyUser();
    const user = users.find((userItem) => userItem.id === where.id);
    delete user?.password;
    return user;
  }),
  create: jest.fn(({ password, ...entity }) => ({ ...entity, id: '1' })),
  remove: jest.fn((entity) => entity),
  save: jest.fn(({ password, ...entity }) => entity)
}));

export default userRepositoryMock;
