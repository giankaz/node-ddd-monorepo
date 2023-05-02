import 'reflect-metadata';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  // log: jest.fn().mockImplementation(() => {}),
  debug: jest.fn().mockImplementation(() => undefined),
  info: jest.fn().mockImplementation(() => undefined),
  warn: jest.fn().mockImplementation(() => undefined),
  error: jest.fn().mockImplementation(() => undefined),
};

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create({
    instance: {
      dbName: 'testing',
    },
  });
  await mongoose.connect(`${mongoServer.getUri()}`, {
    dbName: 'testing',
  });
});

afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connections[0].db.dropDatabase();
  await mongoose.disconnect();
  await mongoose.connection.close();
  await mongoServer.stop();
  return;
});
