import { applyDecorators, Patch } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { CompanyDto } from '../dtos';

export function InactivateCompanyDecorator(path?: string) {
  return applyDecorators(
    Patch(path || '/inactivate/:id'),
    ApiResponse({
      status: 200,
      description: 'Inactivates an company.',
      type: CompanyDto,
    }),
  );
}
