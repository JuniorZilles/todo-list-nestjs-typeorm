import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { taskRepositoryMock } from 'test/utils/mocks/task.repository.mock';
import Task from '../../src/entities/task/task.entity';
import TaskService from '../../src/service/task/task.service';

describe('src :: service :: TaskService()', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(Task),
          useFactory: taskRepositoryMock
        }
      ]
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
