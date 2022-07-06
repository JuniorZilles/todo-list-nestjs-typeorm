import { Repository } from 'typeorm';
import { createManyUser } from '../factory/user.factory';
import { MockType } from '../mock.type';

export const userRepositoryMock: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(({ id }) => {
    const users = createManyUser();
    const user = users.find((user) => user.id === id);
    delete user?.password;
    return user;
  }),
  create: jest.fn((entity) => {
    delete entity.password;
    return { ...entity, id: '1' };
  }),
  remove: jest.fn((entity) => entity),
  save: jest.fn((entity) => {
    delete entity?.password;
    return entity;
  })
}));
