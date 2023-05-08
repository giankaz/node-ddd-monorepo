import { applyDecorators, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { XxxxeclixxxxDto } from '../dtos';

export function FindByIdXxxxeclixxxxDecorator(path?: string) {
  return applyDecorators(
    Get(path || ':id'),
    ApiResponse({
      status: 200,
      description: 'Find an xxxxeclixxxx by id.',
      type: XxxxeclixxxxDto,
    }),
  );
}
