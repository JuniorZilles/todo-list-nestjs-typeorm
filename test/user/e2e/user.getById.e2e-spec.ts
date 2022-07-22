import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../src/module/app.module';
import { createOnePOSTUser } from '../../utils/factory/user.factory';

describe('src :: user :: e2e :: GET/{ID}', () => {
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

    describe('WHEN requesting a existing user with his id', () => {
      it('THEN it should return status 200 with the body', async () => {
        const { id, ...user } = responses[0].body;
        const response = await request(app.getHttpServer()).get(`/user/${id}`);
        const { body, status } = response;

        expect(status).toBe(200);

        expect(body).toEqual({
          id: expect.any(String),
          birthday: expect.any(String),
          cpf: expect.any(String),
          createdAt: expect.any(String),
          email: expect.any(String),
          name: expect.any(String),
          address: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          updatedAt: expect.any(String),
          country: expect.any(String),
          zipCode: expect.any(String)
        });

        expect(body.id).toBe(id);
        expect(body.cpf).toBe(user.cpf);
        expect(body.birthday).toBe(user.birthday);
        expect(body.name).toBe(user.name);
        expect(body.email).toBe(user.email);
        expect(body.address).toBe(user.address);
        expect(body.city).toBe(user.city);
        expect(body.state).toBe(user.state);
        expect(body.country).toBe(user.country);
        expect(body.zipCode).toBe(user.zipCode);
      });
    });

    describe('WHEN requesting a user with a invalid id', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const response = await request(app.getHttpServer()).get(`/user/adsd78`);
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

    describe('WHEN requesting a user with a non existing id', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const response = await request(app.getHttpServer()).get(`/user/6a531ca6-0a13-11ed-861d-0242ac120002`);
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
