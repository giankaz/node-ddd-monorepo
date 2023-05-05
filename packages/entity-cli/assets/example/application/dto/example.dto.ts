import { ExampleValidator } from '../../domain';

export type IExample = Pick<ExampleValidator, keyof ExampleValidator>;
