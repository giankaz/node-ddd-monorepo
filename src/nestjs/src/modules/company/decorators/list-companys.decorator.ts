import { applyDecorators, Get } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ListQueryDto } from '../../shared';
import { ListCompanyOutputDto } from '../dtos';

export function ListCompanysDecorator(path?: string) {
  return applyDecorators(
    Get(path),
    ApiQuery({
      name: 'List Query',
      type: ListQueryDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Lists the companys.',
      type: ListCompanyOutputDto,
    }),
  );
}
