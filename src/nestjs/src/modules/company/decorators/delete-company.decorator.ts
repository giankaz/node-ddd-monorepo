import { applyDecorators, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function DeleteCompanyDecorator(path?: string) {
  return applyDecorators(
    Delete(path || '/hard/:id'),
    ApiResponse({
      status: 200,
      description: 'Hard delete an company.',
      type: Boolean,
    }),
  );
}
