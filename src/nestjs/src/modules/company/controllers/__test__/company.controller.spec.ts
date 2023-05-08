import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CompanyModule } from '../../module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonStatus, RandomCompanyFactory } from 'core';
import mongoose from 'mongoose';

describe('Company e2e', () => {
  let app: INestApplication;
  let mongoInMemory: MongoMemoryServer;

  beforeAll(async () => {
    mongoInMemory = await MongoMemoryServer.create({
      instance: {
        dbName: 'testing',
      },
    });

    const uri = mongoInMemory.getUri();

    await mongoose.connect(`${uri}`, {
      dbName: 'testing',
    });

    const moduleRef = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
          connectionName: 'mongodb',
          useFactory: async () => ({ uri, dbName: 'testing' }),
        }),
        EventEmitterModule.forRoot(),
        CompanyModule,
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useLogger(false);
    await app.init();
  });

  afterAll(async () => {
    await mongoInMemory.stop();
    await app.close();
  });
  it(`/POST create company`, async () => {
    const newCompany = RandomCompanyFactory.createOne();
    const response = await request(app.getHttpServer())
      .post('/company')
      .send({
        ...newCompany.toJSON(),
      })
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual(newCompany.toJSON());
  });

  it(`/GET list company`, async () => {
    const newCompany = RandomCompanyFactory.createOne();
    await request(app.getHttpServer())
      .post('/company')
      .send({
        ...newCompany.toJSON(),
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/company')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual({
      current_page: 1,
      items: [{ ...newCompany.toJSON() }],
      last_page: 1,
      per_page: 15,
      total: response.body?.total,
    });
  });

  it(`/GET find company`, async () => {
    const newCompany = RandomCompanyFactory.createOne();
    await request(app.getHttpServer())
      .post('/company')
      .send({
        ...newCompany.toJSON(),
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/company/' + newCompany.id)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual({ ...newCompany.toJSON() });
  });

  it(`/PATCH update company`, async () => {
    const newCompany = RandomCompanyFactory.createOne();
    await request(app.getHttpServer())
      .post('/company')
      .send({
        ...newCompany.toJSON(),
      })
      .expect(201);

    newCompany.name = 'new';

    const response = await request(app.getHttpServer())
      .patch('/company/' + newCompany.id)
      .send({ name: 'new' })
      .expect(200);

    const { updated_at: bodyUpdatedAt, ...bodyWithoutUpdatedAt } =
      response.body;

    const { updated_at: entityUpdatedAt, ...entityWithoutUpdatedAt } =
      newCompany.toJSON();

    expect(response.body).toBeDefined();
    expect(bodyWithoutUpdatedAt).toEqual(entityWithoutUpdatedAt);
    expect(bodyUpdatedAt).not.toEqual(entityUpdatedAt);
  });

  it(`/PATCH inactivate and activate company`, async () => {
    const newCompany = RandomCompanyFactory.createOne();
    await request(app.getHttpServer())
      .post('/company')
      .send({
        ...newCompany.toJSON(),
      })
      .expect(201);

    const inactivation = await request(app.getHttpServer())
      .patch('/company/inactivate/' + newCompany.id)
      .expect(200);

    expect(inactivation.body).toBeDefined();
    expect(inactivation.body.status).toEqual(CommonStatus.INACTIVE);

    const activation = await request(app.getHttpServer())
      .patch('/company/activate/' + newCompany.id)
      .expect(200);

    expect(activation.body).toBeDefined();
    expect(activation.body.status).toEqual(CommonStatus.ACTIVE);
  });

  it(`/DELETE soft and hard delete company`, async () => {
    const newCompany = RandomCompanyFactory.createOne();
    await request(app.getHttpServer())
      .post('/company')
      .send({
        ...newCompany.toJSON(),
      })
      .expect(201);

    const softdelete = await request(app.getHttpServer())
      .delete('/company/' + newCompany.id)
      .expect(200);

    expect(softdelete.body).toBeDefined();
    expect(softdelete.body.status).toEqual(CommonStatus.DELETED);

    await request(app.getHttpServer())
      .delete('/company/hard/' + newCompany.id)
      .expect(200);

    await request(app.getHttpServer())
      .get('/company/' + newCompany.id)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
