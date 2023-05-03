import { CommonEntityModel } from '../../../shared';
import * as classValidator from 'class-validator';

export class ImportationModel extends CommonEntityModel {
  @classValidator.IsNumber()
  contact_total: number;

  @classValidator.IsString()
  account_id: string;

  @classValidator.IsString()
  company_id: string;

  @classValidator.IsNumber()
  emails_total: number;

  constructor(props: ImportationModel) {
    super(props);
    Object.assign(this, props);
  }
}
