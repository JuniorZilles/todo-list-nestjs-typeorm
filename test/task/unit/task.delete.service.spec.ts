import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import taskRepositoryMock from '../../utils/mocks/task.repository.mock';
import Task from '../../../src/entities/task/task.entity';
import TaskService from '../../../src/service/task/task.service';
import CreateTaskDto from '../../../src/dto/task/create-task.dto';
import User from '../../../src/entities/user/user.entity';
import userRepositoryMock from '../../utils/mocks/user.repository.mock';

describe('src :: service :: TaskService() :: delete', () => {
  describe('GIVEN a mocked repository with 10 tasks', () => {
    let service: TaskService;
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
    describe('WHEN removing a existing task', () => {
      let createdTask: CreateTaskDto;
      beforeEach(async () => {
        createdTask = await service.remove('1');
      });
      it('THEN it should return the removed object', () => {
        expect(createdTask).toBeDefined();
        expect(createdTask).toHaveProperty('id');
        expect(createdTask.id).toBeDefined();
        expect(createdTask).toHaveProperty('description');
        expect(createdTask).toHaveProperty('date');
        expect(createdTask).toHaveProperty('user');
      });
    });

    describe('WHEN removing a non-existing task', () => {
      it('THEN it throw an error', async () => {
        try {
          await service.remove('12');
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect((<NotFoundException>e).name).toBe('NotFoundException');
        }
      });
    });
  });
});
