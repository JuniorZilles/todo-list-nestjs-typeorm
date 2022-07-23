import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../src/module/app.module';
import { createOnePOSTUser } from '../../utils/factory/user.factory';
import { createOnePostTask } from '../../utils/factory/task.factory';

describe('src :: task :: e2e :: POST', () => {
  describe('GIVEN database with 2 user and 1 task each', () => {
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
      responses = await Promise.all([
        request(app.getHttpServer()).post('/user').send(createOnePOSTUser()),
        request(app.getHttpServer()).post('/user').send(createOnePOSTUser())
      ]);
      await Promise.all([
        request(app.getHttpServer()).post('/task').send(createOnePostTask(responses[0].body.id)),
        request(app.getHttpServer()).post('/task').send(createOnePostTask(responses[1].body.id))
      ]);
    });

    describe('WHEN creating a valid new task', () => {
      it('THEN it should return status 201 with the body', async () => {
        const task = createOnePostTask(responses[0].body.id);
        const response = await request(app.getHttpServer()).post('/task').send(task);
        const { body, status } = response;

        expect(status).toBe(201);

        expect(body).toEqual({
          createdAt: expect.any(String),
          date: expect.any(String),
          description: expect.any(String),
          id: expect.any(String),
          updatedAt: expect.any(String),
          userId: expect.any(String)
        });

        expect(body.description).toBe(task.description);
        expect(body.userId).toBe(task.userId);
        expect(body.id).toBeDefined();
      });
    });

    describe('WHEN create a new task for a user that dont exist', () => {
      it('THEN it should return status 404 with no body', async () => {
        const task = createOnePostTask('6a531ca6-0a13-11ed-861d-0242ac120002');
        const response = await request(app.getHttpServer()).post('/task').send(task);
        const { body, status } = response;

        expect(status).toBe(404);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.any(String),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(404);
        expect(body.message).toBe('User not found');
        expect(body.error).toBe('Not Found');
      });
    });

    describe('WHEN create a new task with invalid info', () => {
      it('THEN it should return status 400 with no body', async () => {
        const response = await request(app.getHttpServer()).post('/task').send({
          userId: responses[0].body.id,
          description: '',
          date: '20/06/2020'
        });
        const { body, status } = response;

        expect(status).toBe(400);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.arrayContaining([expect.any(String)]),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(400);
        expect(body.message).toEqual([
          'description should not be empty',
          'The informed date is invalid, it should be after the current date-time'
        ]);
        expect(body.error).toBe('Bad Request');
      });
    });
  });
});
