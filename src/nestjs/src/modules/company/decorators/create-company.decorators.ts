import { applyDecorators, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyDto } from '../dtos';

export function CreateCompanyDecorator(path?: string) {
  return applyDecorators(
    Post(path),
    ApiResponse({
      status: 201,
      description: 'Creates an company and returns it.',
      type: CompanyDto,
    }),
  );
}
