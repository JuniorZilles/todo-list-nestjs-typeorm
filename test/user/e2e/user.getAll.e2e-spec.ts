import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../src/module/app.module';
import { createOnePOSTUser } from '../../utils/factory/user.factory';

describe('src :: user :: e2e :: GET', () => {
  describe('GIVEN a databse with 10 users', () => {
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
      for (let i = 0; i < 10; i += 1) {
        const fixedUser1 = createOnePOSTUser();
        promises.push(request(app.getHttpServer()).post('/user').send(fixedUser1));
      }
      responses = await Promise.all(promises);
    });

    describe('WHEN requesting to find all users', () => {
      it('THEN it should return status 200 with the body and the 10 users', async () => {
        const response = await request(app.getHttpServer()).get(`/user`);
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
          users: expect.arrayContaining([
            {
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
            }
          ])
        });
        expect(body.users.length).toBe(10);
      });
    });

    describe('WHEN requesting to find all users with a condition', () => {
      it('THEN it should return status 200 with the body and the users with this condition', async () => {
        const response = await request(app.getHttpServer()).get(`/user?email=${responses[0].body.email}`);
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
          users: expect.arrayContaining([
            {
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
            }
          ])
        });
        expect(body.users.length).toBe(1);
      });
    });
    describe('WHEN requesting to find last 5 users using pagination', () => {
      it('THEN it should return status 200 with the body and the last users', async () => {
        const response = await request(app.getHttpServer()).get(`/user?limit=5&page=2`);
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
          users: expect.arrayContaining([
            {
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
            }
          ])
        });
        expect(body.users.length).toBe(5);
      });
    });
    describe('WHEN requesting a user with a invalid query parameter', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const response = await request(app.getHttpServer()).get(`/user?cpf=1245`);
        const { body, status } = response;

        expect(status).toBe(400);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.arrayContaining([expect.any(String)]),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(400);
        expect(body.message).toEqual(['The CPF is invalid, it should have the format of xxx.xxx.xxx-xx.']);
        expect(body.error).toBe('Bad Request');
      });
    });
  });
});
