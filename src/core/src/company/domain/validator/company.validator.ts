import { CommonEntityValidator } from '../../../shared';
import { Translations } from 'translation';
import * as classValidator from 'class-validator';
import * as vo from '../../application/dto/value-objects.dto';

export class CompanyValidator extends CommonEntityValidator {
  /*validators*/
  @classValidator.IsString({ message: Translations.x_is_required })
  account_id: string;

  @classValidator.IsString({})
  @classValidator.IsOptional()
  document?: string;

  @classValidator.IsString({ message: Translations.x_is_required })
  phone: string;

  @classValidator.IsString({ message: Translations.x_is_required })
  email: string;

  @classValidator.IsNumber({}, { message: Translations.x_is_required })
  lead_count: number;

  constructor(props: CompanyValidator) {
    super(props);
    Object.assign(this, props);
  }
}
