import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { XxxxeclixxxxModule } from '../../module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonStatus, RandomXxxxeclixxxxFactory } from 'core';
import mongoose from 'mongoose';

describe('Xxxxeclixxxx e2e', () => {
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
        XxxxeclixxxxModule,
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
  it(`/POST create xxxxeclixxxx`, async () => {
    const newXxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();
    const response = await request(app.getHttpServer())
      .post('/xxxxeclixxxx')
      .send({
        ...newXxxxeclixxxx.toJSON(),
      })
      .expect(201);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual(newXxxxeclixxxx.toJSON());
  });

  it(`/GET list xxxxeclixxxx`, async () => {
    const newXxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();
    await request(app.getHttpServer())
      .post('/xxxxeclixxxx')
      .send({
        ...newXxxxeclixxxx.toJSON(),
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/xxxxeclixxxx')
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual({
      current_page: 1,
      items: [{ ...newXxxxeclixxxx.toJSON() }],
      last_page: 1,
      per_page: 15,
      total: response.body?.total,
    });
  });

  it(`/GET find xxxxeclixxxx`, async () => {
    const newXxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();
    await request(app.getHttpServer())
      .post('/xxxxeclixxxx')
      .send({
        ...newXxxxeclixxxx.toJSON(),
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get('/xxxxeclixxxx/' + newXxxxeclixxxx.id)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body).toEqual({ ...newXxxxeclixxxx.toJSON() });
  });

  it(`/PATCH update xxxxeclixxxx`, async () => {
    const newXxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();
    await request(app.getHttpServer())
      .post('/xxxxeclixxxx')
      .send({
        ...newXxxxeclixxxx.toJSON(),
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .patch('/xxxxeclixxxx/' + newXxxxeclixxxx.id)
      .send()
      .expect(200);

    const { updated_at: bodyUpdatedAt, ...bodyWithoutUpdatedAt } =
      response.body;

    const { updated_at: entityUpdatedAt, ...entityWithoutUpdatedAt } =
      newXxxxeclixxxx.toJSON();

    expect(response.body).toBeDefined();
    expect(bodyWithoutUpdatedAt).toEqual(entityWithoutUpdatedAt);
  });

  it(`/PATCH deactivate and activate xxxxeclixxxx`, async () => {
    const newXxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();
    await request(app.getHttpServer())
      .post('/xxxxeclixxxx')
      .send({
        ...newXxxxeclixxxx.toJSON(),
      })
      .expect(201);

    const deactivation = await request(app.getHttpServer())
      .patch('/xxxxeclixxxx/deactivate/' + newXxxxeclixxxx.id)
      .expect(200);

    expect(deactivation.body).toBeDefined();
    expect(deactivation.body.status).toEqual(CommonStatus.INACTIVE);

    const activation = await request(app.getHttpServer())
      .patch('/xxxxeclixxxx/activate/' + newXxxxeclixxxx.id)
      .expect(200);

    expect(activation.body).toBeDefined();
    expect(activation.body.status).toEqual(CommonStatus.ACTIVE);
  });

  it(`/DELETE soft and hard delete xxxxeclixxxx`, async () => {
    const newXxxxeclixxxx = RandomXxxxeclixxxxFactory.createOne();
    await request(app.getHttpServer())
      .post('/xxxxeclixxxx')
      .send({
        ...newXxxxeclixxxx.toJSON(),
      })
      .expect(201);

    const softdelete = await request(app.getHttpServer())
      .delete('/xxxxeclixxxx/' + newXxxxeclixxxx.id)
      .expect(200);

    expect(softdelete.body).toBeDefined();
    expect(softdelete.body.status).toEqual(CommonStatus.DELETED);

    await request(app.getHttpServer())
      .delete('/xxxxeclixxxx/hard/' + newXxxxeclixxxx.id)
      .expect(200);

    await request(app.getHttpServer())
      .get('/xxxxeclixxxx/' + newXxxxeclixxxx.id)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
