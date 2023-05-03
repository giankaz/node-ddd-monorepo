import { Entity } from '../../../shared';
import { ExampleModel } from '../models';

export class Example extends Entity<ExampleModel> implements ExampleModel {
  constructor(props: ExampleModel) {
    super(props, ExampleModel);
  }

  get value() {
    return this.props.value;
  }

  changeValue(newValue: number) {
    this.props.value = newValue;
    this.update();
  }
}

export type ExampleInput = Pick<Example, 'value' | 'name' | 'status'>;

export type IExample = Pick<ExampleModel, keyof ExampleModel>;

export type IPartialExample = Partial<IExample>;
