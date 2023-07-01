import { validateSync } from 'class-validator';

export type FieldsErrors = { message: string; context: string };

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
    const errors = validateSync(data as object, {
      stopAtFirstError: true,
    });

    if (errors.length) {
      this.errors = { ...this.errors };
      for (const error of errors) {
        const field = error.property;
        this.errors = {
          message: Object.values(error.constraints || {}).join(''),
          context: field,
        };
      }
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}

export class ValidatorFactory {
  static create<Props>() {
    return new ValidatorFields<Props>();
  }
}
