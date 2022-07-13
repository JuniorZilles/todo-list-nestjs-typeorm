import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import taskRepositoryMock from '../../utils/mocks/task.repository.mock';
import Task from '../../../src/entities/task/task.entity';
import TaskService from '../../../src/service/task/task.service';
import { createOneTask } from '../../utils/factory/task.factory';
import CreateTaskDto from '../../../src/dto/task/create-task.dto';
import User from '../../../src/entities/user/user.entity';
import userRepositoryMock from '../../utils/mocks/user.repository.mock';

describe('src :: service :: TaskService() :: create', () => {
  describe('GIVEN a mocked repository with ZERO tasks, and 10 users', () => {
    let service: TaskService;
    const taskFactory = createOneTask();
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          TaskService,
          {
            provide: getRepositoryToken(Task),
            useFactory: taskRepositoryMock
          },
          {
            provide: getRepositoryToken(User),
            useFactory: userRepositoryMock
          }
        ]
      }).compile();

      service = module.get<TaskService>(TaskService);
    });
    describe('WHEN a existing user adds a new task', () => {
      let createdTask: CreateTaskDto;
      beforeEach(async () => {
        createdTask = await service.create(taskFactory);
      });
      it('THEN it should be added if valid', () => {
        expect(createdTask).toBeDefined();
        expect(createdTask).toHaveProperty('id');
        expect(createdTask.id).toBeDefined();
        expect(createdTask).toHaveProperty('description');
        expect(createdTask).toHaveProperty('date');
        expect(createdTask).toHaveProperty('user');
      });
    });

    describe('WHEN a task is created for a non existing user', () => {
      it('THEN it throw an error', async () => {
        try {
          await service.create({ ...taskFactory, userId: '12' });
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect((<NotFoundException>e).name).toBe('NotFoundException');
        }
      });
    });
  });
});
