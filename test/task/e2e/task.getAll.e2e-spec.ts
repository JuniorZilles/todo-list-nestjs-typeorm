import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../src/module/app.module';
import { createOnePOSTUser } from '../../utils/factory/user.factory';
import { createOnePostTask } from '../../utils/factory/task.factory';

describe('src :: user :: e2e :: GET', () => {
  describe('GIVEN a databse with 10 users and 1 task each', () => {
    let app: INestApplication;

    beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
      }).compile();

      app = moduleFixture.createNestApplication();

      app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true
        })
      );

      await app.init();
    });

    afterAll(async () => {
      await app.close();
    });
    let responses: request.Response[];
    beforeEach(async () => {
      const promises = [];
      const promisesTask = [];
      for (let i = 0; i < 2; i += 1) {
        const fixedUser1 = createOnePOSTUser();
        promises.push(request(app.getHttpServer()).post('/user').send(fixedUser1));
      }
      responses = await Promise.all(promises);
      responses.forEach((element) => {
        for (let i = 0; i < 10; i += 1) {
          promisesTask.push(request(app.getHttpServer()).post('/task').send(createOnePostTask(element.body.id)));
        }
      });
      await Promise.all(promisesTask);
    });

    describe('WHEN requesting to find all tasks', () => {
      it('THEN it should return status 200 with the body and the 20 tasks', async () => {
        const response = await request(app.getHttpServer()).get(`/task`);
        const { body, status } = response;

        expect(status).toBe(200);

        expect(body).toEqual({
          meta: {
            currentPage: expect.any(Number),
            itemCount: expect.any(Number),
            itemsPerPage: expect.any(Number),
            totalItems: expect.any(Number),
            totalPages: expect.any(Number)
          },
          tasks: expect.arrayContaining([
            {
              createdAt: expect.any(String),
              date: expect.any(String),
              description: expect.any(String),
              id: expect.any(String),
              updatedAt: expect.any(String),
              userId: expect.any(String)
            }
          ])
        });
        expect(body.tasks.length).toBe(10);
        expect(body.meta.currentPage).toBe(1);
        expect(body.meta.itemCount).toBe(10);
        expect(body.meta.totalItems).toBe(20);
      });
    });

    describe('WHEN requesting to find all tasks with a condition', () => {
      it('THEN it should return status 200 with the body and the tasks with this condition', async () => {
        const response = await request(app.getHttpServer()).get(`/task?userId=${responses[0].body.id}`);
        const { body, status } = response;

        expect(status).toBe(200);

        expect(body).toEqual({
          meta: {
            currentPage: expect.any(Number),
            itemCount: expect.any(Number),
            itemsPerPage: expect.any(Number),
            totalItems: expect.any(Number),
            totalPages: expect.any(Number)
          },
          tasks: expect.arrayContaining([
            {
              createdAt: expect.any(String),
              date: expect.any(String),
              description: expect.any(String),
              id: expect.any(String),
              updatedAt: expect.any(String),
              userId: expect.any(String)
            }
          ])
        });
        expect(body.tasks.length).toBe(10);
        expect(body.meta.currentPage).toBe(1);
        expect(body.meta.itemCount).toBe(10);
        expect(body.meta.totalItems).toBe(10);
      });
    });
    describe('WHEN requesting to find 5 tasks at the second page using pagination', () => {
      it('THEN it should return status 200 with the body and the tasks', async () => {
        const response = await request(app.getHttpServer()).get(`/task?limit=5&page=2`);
        const { body, status } = response;

        expect(status).toBe(200);

        expect(body).toEqual({
          meta: {
            currentPage: expect.any(Number),
            itemCount: expect.any(Number),
            itemsPerPage: expect.any(Number),
            totalItems: expect.any(Number),
            totalPages: expect.any(Number)
          },
          tasks: expect.arrayContaining([
            {
              createdAt: expect.any(String),
              date: expect.any(String),
              description: expect.any(String),
              id: expect.any(String),
              updatedAt: expect.any(String),
              userId: expect.any(String)
            }
          ])
        });
        expect(body.tasks.length).toBe(5);
        expect(body.meta.currentPage).toBe(2);
        expect(body.meta.itemCount).toBe(5);
        expect(body.meta.totalItems).toBe(20);
      });
    });
    describe('WHEN requesting a task with a invalid query parameter', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const response = await request(app.getHttpServer()).get(`/task?userId=1245`);
        const { body, status } = response;

        expect(status).toBe(400);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.arrayContaining([expect.any(String)]),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(400);
        expect(body.message).toEqual(['userId must be a UUID']);
        expect(body.error).toBe('Bad Request');
      });
    });
  });
});
