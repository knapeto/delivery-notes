import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '../health.controller';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/__health (GET)', () => {
    return request(app.getHttpServer())
      .get('/__health')
      .expect(200)
      .expect('is healthy');
  });
});
