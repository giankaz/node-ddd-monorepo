import { CommonEntityModel } from '../../../shared';
import * as classValidator from 'class-validator';

export class CompanyModel extends CommonEntityModel {
  @classValidator.IsString()
  account_id: string;

  @classValidator.IsString()
  email: string;

  @classValidator.IsString()
  phone: string;

  @classValidator.IsNumber()
  lead_count: number;

  constructor(props: CompanyModel) {
    super(props);
    Object.assign(this, props);
  }
}
