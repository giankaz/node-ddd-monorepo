import { CommonEntityModel } from '../../../shared';
import * as classValidator from 'class-validator';

export class LeadModel extends CommonEntityModel {
  @classValidator.IsString()
  account_id: string;

  @classValidator.IsString()
  document: string;

  @classValidator.IsString()
  company_id: string;

  @classValidator.IsString()
  email: string;

  @classValidator.IsString()
  birth_date: string;

  @classValidator.IsString()
  phone: string;

  @classValidator.IsString()
  @classValidator.IsOptional()
  import_id?: string;

  @classValidator.IsNumber()
  story_points: number;

  @classValidator.IsString()
  @classValidator.IsOptional()
  origin?: string;

  @classValidator.IsBoolean()
  @classValidator.IsOptional()
  is_opportunity?: boolean;

  @classValidator.IsString()
  @classValidator.IsOptional()
  user_id?: string;

  @classValidator.IsString()
  @classValidator.IsOptional()
  state?: string;

  constructor(props: LeadModel) {
    super(props);
    Object.assign(this, props);
  }
}
