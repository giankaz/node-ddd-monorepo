import { applyDecorators, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function DeleteXxxxeclixxxxDecorator(path?: string) {
  return applyDecorators(
    Delete(path || '/hard/:id'),
    ApiResponse({
      status: 200,
      description: 'Hard delete an xxxxeclixxxx.',
      type: Boolean,
    }),
  );
}
