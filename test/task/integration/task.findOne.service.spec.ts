import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import taskRepositoryMock from '../../utils/mocks/task.repository.mock';
import Task from '../../../src/entities/task/task.entity';
import TaskService from '../../../src/service/task/task.service';
import CreateTaskDto from '../../../src/dto/task/create-task.dto';
import User from '../../../src/entities/user/user.entity';
import userRepositoryMock from '../../utils/mocks/user.repository.mock';

describe('src :: service :: TaskService() :: findOne', () => {
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
    describe('WHEN requesting a task with its specific ID', () => {
      let foundTask: CreateTaskDto;
      beforeEach(async () => {
        foundTask = await service.findOne('1');
      });
      it('THEN it should return the object found', () => {
        expect(foundTask).toBeDefined();
        expect(foundTask).toHaveProperty('id');
        expect(foundTask.id).toBeDefined();
        expect(foundTask.id).toBe('1');
        expect(foundTask).toHaveProperty('description');
        expect(foundTask).toHaveProperty('date');
        expect(foundTask).toHaveProperty('userId');
      });
    });

    describe('WHEN requesting a non-existing task', () => {
      it('THEN it throw an error', async () => {
        try {
          await service.findOne('12');
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundException);
          expect((<NotFoundException>e).name).toBe('NotFoundException');
        }
      });
    });
  });
});
