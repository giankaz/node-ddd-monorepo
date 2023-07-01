import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { XxxxeclixxxxDto } from '../dtos';

export function InactivateXxxxeclixxxxDecorator(path?: string) {
  return applyDecorators(
    Patch(path || '/inactivate/:id'),
    ApiResponse({
      status: 200,
      description: 'Inactivates an xxxxeclixxxx.',
      type: XxxxeclixxxxDto,
    }),
  );
}
