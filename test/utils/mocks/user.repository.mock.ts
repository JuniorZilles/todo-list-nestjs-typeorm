import { Repository } from 'typeorm';
import { createManyUser } from '../factory/user.factory';
import { MockType } from '../mock.type';

export const userRepositoryMock: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((id) => {
    return createManyUser().find((user) => user.id === id);
  }),
  create: jest.fn((entity) => {
    return { ...entity, id: 1 };
  }),
  update: jest.fn((id, entity) => {
    const user = createManyUser().find((user) => user.id === id);
    if (user) {
      return { ...entity, id };
    } else {
      return null;
    }
  }),
  save: jest.fn((entity) => entity)
}));
