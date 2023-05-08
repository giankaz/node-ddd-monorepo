import { UpdateCompanyUseCase } from 'core';

export class UpdateCompanyDto
  implements Omit<UpdateCompanyUseCase.Input, 'id'>
{
  name?: string;
}
