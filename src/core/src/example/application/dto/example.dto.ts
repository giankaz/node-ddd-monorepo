import { ExampleModel } from '../../domain';

export type IExample = Pick<ExampleModel, keyof ExampleModel>;
