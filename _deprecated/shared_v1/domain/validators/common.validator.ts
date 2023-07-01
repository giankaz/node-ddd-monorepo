import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { Translations } from 'translation';

export enum CommonStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DELETED = 'DELETED',
}

export class CommonEntityValidator {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString({
    message: Translations.x_is_required,
  })
  @IsOptional()
  name?: string;

  @IsEnum(CommonStatus, {
    message: Translations.status_must_be_active_inactive_deleted,
  })
  @IsOptional()
  status?: CommonStatus;

  @IsDate()
  @IsOptional()
  created_at?: Date;

  @IsDate()
  @IsOptional()
  updated_at?: Date | null;

  constructor(props: CommonEntityValidator) {
    for (const key in props) {
      if (key in CommonEntityValidator) {
        Object.assign(this, props);
      }
    }
  }
}
