import { applyDecorators, Delete } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyDto } from '../dtos';

export function SoftDeleteCompanyDecorator(path?: string) {
  return applyDecorators(
    Delete(path || ':id'),
    ApiResponse({
      status: 200,
      description: 'Soft delete an company.',
      type: CompanyDto,
    }),
  );
}
