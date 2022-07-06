import { Repository } from 'typeorm';
import { MockType } from '../mock.type';

const taskRepositoryMock: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn((entity) => entity),
  create: jest.fn((entity) => entity),
  update: jest.fn((entity) => entity)
}));

export default taskRepositoryMock;
