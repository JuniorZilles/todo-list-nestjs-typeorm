import { Repository } from 'typeorm';
import { createManyTask } from '../factory/task.factory';
import { MockType } from '../mock.type';

const taskRepositoryMock: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(({ where }) => {
    const tasks = createManyTask();
    const task = tasks.find((item) => item.id === where.id);
    return task;
  }),
  create: jest.fn((entity) => ({ ...entity, id: '1' })),
  remove: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity)
}));

export default taskRepositoryMock;
