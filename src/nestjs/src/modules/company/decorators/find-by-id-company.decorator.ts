import { applyDecorators, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyDto } from '../dtos';

export function FindByIdCompanyDecorator(path?: string) {
  return applyDecorators(
    Get(path || ':id'),
    ApiResponse({
      status: 200,
      description: 'Find an company by id.',
      type: CompanyDto,
    }),
  );
}
