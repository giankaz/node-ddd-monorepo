import { validateSync } from 'class-validator';

export type FieldsErrors = {
  [field: string]: string[];
};

export interface ValidatorFieldsInterface<PropsValidated> {
  errors: FieldsErrors | null;
  validatedData: PropsValidated | null;
  validate(data: PropsValidated | null): boolean;
}

export class ValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors | null = null;
  validatedData: PropsValidated | null = null;

  validate(data: PropsValidated | null): boolean {
    const errors = validateSync(data as object);
    if (errors.length) {
      this.errors = { ...this.errors };
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints || {});
      }
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}
