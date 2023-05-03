import { CommonEntityModel } from '../../../shared';
import * as classValidator from 'class-validator';

export class ReportModel extends CommonEntityModel {
  @classValidator.IsNumber()
  customers: number;

  @classValidator.IsNumber()
  conversions: number;

  @classValidator.IsNumber()
  qualified_leads: number;

  @classValidator.IsNumber()
  opportunities: number;

  @classValidator.IsNumber()
  leads: number;

  constructor(props: ReportModel) {
    super(props);
    Object.assign(this, props);
  }
}
