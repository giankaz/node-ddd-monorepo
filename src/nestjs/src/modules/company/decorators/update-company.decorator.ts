import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyDto } from '../dtos';

export function UpdateCompanyDecorator(path?: string) {
  return applyDecorators(
    Patch(path || ':id'),
    ApiResponse({
      status: 200,
      description: 'Updates an company.',
      type: CompanyDto,
    }),
  );
}
