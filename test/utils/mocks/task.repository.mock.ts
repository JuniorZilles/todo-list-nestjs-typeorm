import { Repository } from 'typeorm';
import { MockType } from '../mock.type';

export const taskRepositoryMock: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity)
}));
