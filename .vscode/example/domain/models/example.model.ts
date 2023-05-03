import { IsNumber } from 'class-validator';
import { CommonEntityModel } from '../../../shared';

export class ExampleModel extends CommonEntityModel {
  @IsNumber()
  value: number;

  constructor(props: ExampleModel) {
    super(props);
    Object.assign(this, props);
  }
}
