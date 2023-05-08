import 'reflect-metadata';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

afterEach(async () => {
  const collections = await mongoose.connection
    .getClient()
    .db('testing')
    .collections();

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
  return;
});
