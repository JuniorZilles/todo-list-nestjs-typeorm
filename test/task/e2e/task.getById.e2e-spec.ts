import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../src/module/app.module';
import { createOnePOSTUser } from '../../utils/factory/user.factory';
import { createOnePostTask } from '../../utils/factory/task.factory';

describe('src :: task :: e2e :: GET/{ID}', () => {
  describe('GIVEN database with 2 users and 1 task each', () => {
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
    let responsesTask: request.Response[];
    beforeEach(async () => {
      responses = await Promise.all([
        request(app.getHttpServer()).post('/user').send(createOnePOSTUser()),
        request(app.getHttpServer()).post('/user').send(createOnePOSTUser())
      ]);
      responsesTask = await Promise.all([
        request(app.getHttpServer()).post('/task').send(createOnePostTask(responses[0].body.id)),
        request(app.getHttpServer()).post('/task').send(createOnePostTask(responses[1].body.id))
      ]);
    });

    describe('WHEN requesting a existing task with his id', () => {
      it('THEN it should return status 200 with the body', async () => {
        const { id, ...task } = responsesTask[0].body;
        const response = await request(app.getHttpServer()).get(`/task/${id}`);
        const { body, status } = response;

        expect(status).toBe(200);

        expect(body).toEqual({
          createdAt: expect.any(String),
          date: expect.any(String),
          description: expect.any(String),
          id: expect.any(String),
          updatedAt: expect.any(String),
          userId: expect.any(String)
        });

        expect(body.id).toBe(id);
        expect(body.date).toBe(task.date);
        expect(body.description).toBe(task.description);
        expect(body.userId).toBe(task.userId);
      });
    });

    describe('WHEN requesting a task with a invalid id', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const response = await request(app.getHttpServer()).get(`/task/adsd78`);
        const { body, status } = response;

        expect(status).toBe(400);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.any(String),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(400);
        expect(body.message).toBe('Validation failed (uuid  is expected)');
        expect(body.error).toBe('Bad Request');
      });
    });

    describe('WHEN requesting a task with a non existing id', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const response = await request(app.getHttpServer()).get(`/task/6a531ca6-0a13-11ed-861d-0242ac120002`);
        const { body, status } = response;

        expect(status).toBe(404);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.any(String),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(404);
        expect(body.message).toBe('Task not found');
        expect(body.error).toBe('Not Found');
      });
    });
  });
});
