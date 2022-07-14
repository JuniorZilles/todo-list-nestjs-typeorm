import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../src/module/app.module';
import { USER } from '../../utils/factory/user.factory';

describe('src :: user :: e2e', () => {
  describe('GIVEN a mocked repository with ZERO users', () => {
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

    describe('WHEN creating a valid new user / (POST)', () => {
      it('THEN it should return status 201 with the body', async () => {
        const response = await request(app.getHttpServer()).post('/user').send(USER);
        const { body, status } = response;

        expect(status).toBe(201);

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

        expect(body.cpf).toBe(USER.cpf);
        expect(body.birthday).toBe(USER.birthday);
        expect(body.name).toBe(USER.name);
        expect(body.email).toBe(USER.email);
        expect(body.address).toBe(USER.address);
        expect(body.city).toBe(USER.city);
        expect(body.state).toBe(USER.state);
        expect(body.country).toBe(USER.country);
        expect(body.zipCode).toBe(USER.zipCode);
      });
    });
  });
});
