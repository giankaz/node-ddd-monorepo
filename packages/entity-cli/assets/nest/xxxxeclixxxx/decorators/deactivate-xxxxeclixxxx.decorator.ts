import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { XxxxeclixxxxDto } from '../dtos';

export function DeactivateXxxxeclixxxxDecorator(path?: string) {
  return applyDecorators(
    Patch(path || '/deactivate/:id'),
    ApiResponse({
      status: 200,
      description: 'Deactivates an xxxxeclixxxx.',
      type: XxxxeclixxxxDto,
    }),
  );
}
