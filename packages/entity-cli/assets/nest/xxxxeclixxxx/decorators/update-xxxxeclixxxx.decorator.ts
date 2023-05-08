import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { XxxxeclixxxxDto } from '../dtos';

export function UpdateXxxxeclixxxxDecorator(path?: string) {
  return applyDecorators(
    Patch(path || ':id'),
    ApiResponse({
      status: 200,
      description: 'Updates an xxxxeclixxxx.',
      type: XxxxeclixxxxDto,
    }),
  );
}
