import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionFilter } from './modules/shared/filters/http-expection.filter';

@Module({
  imports: [
    /*nest packages*/

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    MongooseModule.forRootAsync({
      connectionName: 'mongodb',
      useFactory: async () => ({
        uri: process.env.MONGO_URI,
        dbName: process.env.MONGODB_NAME,
      }),
    }),

    /*modules*/
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
