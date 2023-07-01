import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { XxxxeclixxxxDto } from '../dtos';

export function ActivateXxxxeclixxxxDecorator(path?: string) {
  return applyDecorators(
    Patch(path || '/activate/:id'),
    ApiResponse({
      status: 200,
      description: 'Activates an xxxxeclixxxx.',
      type: XxxxeclixxxxDto,
    }),
  );
}
