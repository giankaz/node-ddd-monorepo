import { applyDecorators, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { XxxxeclixxxxDto } from '../dtos';

export function CreateXxxxeclixxxxDecorator(path?: string) {
  return applyDecorators(
    Post(path),
    ApiResponse({
      status: 201,
      description: 'Creates an xxxxeclixxxx and returns it.',
      type: XxxxeclixxxxDto,
    }),
  );
}
