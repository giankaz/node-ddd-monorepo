import { CommonEntityModel } from '../../../shared';
import * as classValidator from 'class-validator';

export class ActivityModel extends CommonEntityModel {
  @classValidator.IsString()
  data: string;

  @classValidator.IsString()
  data_type: string;

  @classValidator.IsString()
  account_id: string;

  @classValidator.IsString()
  origin: string;

  @classValidator.IsNumber()
  story_points: number;

  @classValidator.IsString()
  type: string;

  @classValidator.IsString()
  lead_id: string;

  constructor(props: ActivityModel) {
    super(props);
    Object.assign(this, props);
  }
}
