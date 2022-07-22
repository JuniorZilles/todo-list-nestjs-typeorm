import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../src/module/app.module';
import { createOnePOSTUser } from '../../utils/factory/user.factory';

describe('src :: user :: e2e :: PUT', () => {
  describe('GIVEN a database with TWO users', () => {
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

    describe('WHEN update a existing user', () => {
      it('THEN it should return status 200 with the body', async () => {
        const user = createOnePOSTUser();
        const { id } = responses[0].body;
        const response = await request(app.getHttpServer()).put(`/user/${id}`).send(user);
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

    describe('WHEN updating a user with same email as another user', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const user = createOnePOSTUser();
        const { id } = responses[0].body;
        const { email } = responses[1].body;
        const response = await request(app.getHttpServer())
          .put(`/user/${id}`)
          .send({ ...user, email });
        const { body, status } = response;

        expect(status).toBe(400);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.any(String),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(400);
        expect(body.message).toBe('Duplicate cpf or email');
        expect(body.error).toBe('Bad Request');
      });
    });

    describe('WHEN updating a user with same cpf as another user', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const user = createOnePOSTUser();
        const { id } = responses[0].body;
        const { cpf } = responses[1].body;
        const response = await request(app.getHttpServer())
          .put(`/user/${id}`)
          .send({ ...user, cpf });
        const { body, status } = response;

        expect(status).toBe(400);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.any(String),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(400);
        expect(body.message).toBe('Duplicate cpf or email');
        expect(body.error).toBe('Bad Request');
      });
    });

    describe('WHEN updating a user passing the same cpf and email', () => {
      it('THEN it should return status 200 with the body containing updated content', async () => {
        const user = createOnePOSTUser();
        const { id, email, cpf } = responses[0].body;
        const response = await request(app.getHttpServer())
          .put(`/user/${id}`)
          .send({ ...user, cpf, email });
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
        expect(body.cpf).toBe(cpf);
        expect(body.birthday).toBe(user.birthday);
        expect(body.name).toBe(user.name);
        expect(body.email).toBe(email);
        expect(body.address).toBe(user.address);
        expect(body.city).toBe(user.city);
        expect(body.state).toBe(user.state);
        expect(body.country).toBe(user.country);
        expect(body.zipCode).toBe(user.zipCode);
      });
    });

    describe('WHEN updating a user without passing cpf and email', () => {
      it('THEN it should return status 200 with the body containing updated content', async () => {
        const user = createOnePOSTUser();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { cpf, email, ...rest } = user;
        const { id } = responses[0].body;
        const response = await request(app.getHttpServer())
          .put(`/user/${id}`)
          .send({ ...rest });
        const { body, status } = response;

        expect(status).toBe(400);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.arrayContaining([expect.any(String)]),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(400);
        expect(body.message).toEqual([
          'The CPF is invalid, it should have the format of xxx.xxx.xxx-xx.',
          'cpf should not be empty',
          'email must be an email',
          'email should not be empty'
        ]);
        expect(body.error).toBe('Bad Request');
      });
    });

    describe('WHEN updating a user with invalid cpf, email, password and birthday', () => {
      it('THEN it should return status 400 with the body containing the error message', async () => {
        const user = createOnePOSTUser();
        const { id } = responses[0].body;
        const response = await request(app.getHttpServer())
          .put(`/user/${id}`)
          .send({ ...user, cpf: '12345678910', email: 'jj.com', password: '142', birthday: '12/12/2012' });
        const { body, status } = response;

        expect(status).toBe(400);

        expect(body).toEqual({
          statusCode: expect.any(Number),
          message: expect.arrayContaining([expect.any(String)]),
          error: expect.any(String)
        });

        expect(body.statusCode).toBe(400);
        expect(body.message).toEqual([
          'The CPF is invalid, it should have the format of xxx.xxx.xxx-xx.',
          'The informed date is invalid, it should have the format of dd/mm/yyyy and be greater than 18 years from now',
          'email must be an email',
          'password must be longer than or equal to 6 characters'
        ]);
        expect(body.error).toBe('Bad Request');
      });

      describe('WHEN update a user with a invalid id', () => {
        it('THEN it should return status 400 with the body containing the error message', async () => {
          const user = createOnePOSTUser();
          const response = await request(app.getHttpServer()).put(`/user/adsd78`).send(user);
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

      describe('WHEN update a user with a non existing id', () => {
        it('THEN it should return status 400 with the body containing the error message', async () => {
          const user = createOnePOSTUser();
          const response = await request(app.getHttpServer())
            .put(`/user/6a531ca6-0a13-11ed-861d-0242ac120002`)
            .send(user);
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
});
