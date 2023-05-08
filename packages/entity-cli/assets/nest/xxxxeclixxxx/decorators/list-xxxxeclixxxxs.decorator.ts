import { applyDecorators, Get } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ListQueryDto } from '../../shared';
import { ListXxxxeclixxxxOutputDto } from '../dtos';

export function ListXxxxeclixxxxsDecorator(path?: string) {
  return applyDecorators(
    Get(path),
    ApiQuery({
      name: 'List Query',
      type: ListQueryDto,
    }),
    ApiResponse({
      status: 200,
      description: 'Lists the xxxxeclixxxxs.',
      type: ListXxxxeclixxxxOutputDto,
    }),
  );
}
