import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../src/module/app.module';
import { createOnePOSTUser } from '../../utils/factory/user.factory';

describe('src :: user :: e2e :: DELETE/{ID}', () => {
  describe('GIVEN a databse with TWO users', () => {
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
      const fixedUser1 = createOnePOSTUser();
      const fixedUser2 = createOnePOSTUser();
      responses = await Promise.all([
        request(app.getHttpServer()).post('/user').send(fixedUser1),
        request(app.getHttpServer()).post('/user').send(fixedUser2)
      ]);
    });

    describe('WHEN removing a existing user with his id', () => {
      it('THEN it should return status 204 with no body', async () => {
        const { id } = responses[0].body;
        const response = await request(app.getHttpServer()).delete(`/user/${id}`);

        expect(response.status).toBe(204);

        expect(response.body).toEqual({});

        const getResponse = await request(app.getHttpServer()).get(`/user/${id}`);
        const { body, status } = getResponse;

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

    describe('WHEN removing a user with a invalid id', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const response = await request(app.getHttpServer()).delete(`/user/adsd78`);
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

    describe('WHEN removing a user with a non existing id', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const response = await request(app.getHttpServer()).delete(`/user/6a531ca6-0a13-11ed-861d-0242ac120002`);
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
  });
});
