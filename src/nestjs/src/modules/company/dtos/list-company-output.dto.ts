import { CompanyDto } from './company.dto';

export class ListCompanyOutputDto {
  items: CompanyDto[];

  total: number;

  per_page: number;

  last_page: number;

  current_page: number;
}
