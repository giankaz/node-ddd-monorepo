import { applyDecorators, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { XxxxeclixxxxDto } from '../dtos';

export function SoftDeleteXxxxeclixxxxDecorator(path?: string) {
  return applyDecorators(
    Delete(path || ':id'),
    ApiResponse({
      status: 200,
      description: 'Soft delete an xxxxeclixxxx.',
      type: XxxxeclixxxxDto,
    }),
  );
}
