import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyDto } from '../dtos';

export function ActivateCompanyDecorator(path?: string) {
  return applyDecorators(
    Patch(path || '/activate/:id'),
    ApiResponse({
      status: 200,
      description: 'Activates an company.',
      type: CompanyDto,
    }),
  );
}
