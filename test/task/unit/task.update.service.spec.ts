import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import taskRepositoryMock from '../../utils/mocks/task.repository.mock';
import Task from '../../../src/entities/task/task.entity';
import TaskService from '../../../src/service/task/task.service';
import CreateTaskDto from '../../../src/dto/task/create-task.dto';
import { createOneTask } from '../../utils/factory/task.factory';
import User from '../../../src/entities/user/user.entity';
import userRepositoryMock from '../../utils/mocks/user.repository.mock';

describe('src :: service :: TaskService() :: update', () => {
  describe('GIVEN a mocked repository with 10 tasks, and 10 users', () => {
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
    describe('WHEN a existing user updates a task', () => {
      let updatedTask: CreateTaskDto;
      beforeEach(async () => {
        updatedTask = await service.update('1', taskFactory);
      });
      it('THEN it should be updated if valid', () => {
        expect(updatedTask).toBeDefined();
        expect(updatedTask).toHaveProperty('id');
        expect(updatedTask.id).toBeDefined();
        expect(updatedTask).toHaveProperty('description');
        expect(updatedTask.description).toBe(taskFactory.description);
        expect(updatedTask).toHaveProperty('date');
        expect(updatedTask.date).toBe(taskFactory.date);
        expect(updatedTask).toHaveProperty('user');
        expect(updatedTask.userId).toBe(taskFactory.userId);
      });
    });

    describe('WHEN a task is updated for a non existing user', () => {
      beforeEach(async () => {
        taskFactory.userId = '12';
      });
      it('THEN it throw an error', async () => {
        try {
          await service.update('1', taskFactory);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect((<NotFoundException>e).name).toBe('NotFoundException');
        }
      });
    });

    describe('WHEN a task is updated for a non existing task', () => {
      it('THEN it throw an error', async () => {
        try {
          await service.update('12', taskFactory);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect((<NotFoundException>e).name).toBe('NotFoundException');
        }
      });
    });
  });
});
