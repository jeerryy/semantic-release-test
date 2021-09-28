import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, Logger } from '@nestjs/common';
import { SampleModule } from '@src/modules/sample/sample.module';
import { SampleService } from '@src/modules/sample/sample.service';

describe('Sample Controller', () => {
  const logger: Logger = new Logger();
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [SampleModule],
      providers: [SampleService],
    }).compile();

    app = moduleRef.createNestApplication();
    logger.debug(`app is initializing...`);
    await app.init();
    logger.debug(`app is initialized`);
  });

  it('GET method 예제입니다.', async () => {
    await request(app.getHttpServer()).get('/sample').expect(200).expect('It works');
  });

  it('GET method query parameter 에제입니다.', async () => {
    const queryParam = {
      id: 'It works',
    };
    await request(app.getHttpServer()).get('/sample').query(queryParam).expect(200).expect(queryParam.id);
  });

  it('GET method path variable 에제입니다.', async () => {
    const pathVariable = 'works';
    await request(app.getHttpServer()).get(`/sample/${pathVariable}`).expect(200).expect(pathVariable);
  });

  it('POST method 에제입니다.', async () => {
    const body = {
      it: 'works',
    };
    await request(app.getHttpServer()).post(`/sample`).send(body).expect(201).expect(body);
  });

  it('PUT method 에제입니다.', async () => {
    const body = {
      it: 'works',
    };
    await request(app.getHttpServer()).put(`/sample`).send(body).expect(200).expect(body);
  });

  it('PATCH method 에제입니다.', async () => {
    const body = {
      it: 'works',
    };
    await request(app.getHttpServer()).patch(`/sample`).send(body).expect(200).expect(body);
  });

  it('DELETE method 에제입니다.', async () => {
    const body = {
      it: 'works',
    };
    await request(app.getHttpServer()).delete(`/sample`).send(body).expect(200);
  });

  afterAll(async () => {
    logger.debug(`app is closing...`);
    await app.close();
    logger.debug(`app is closed`);
  });
});
