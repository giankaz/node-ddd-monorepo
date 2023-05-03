import { Example } from '../../domain';

export type ExampleInput = Pick<Example, 'name' | 'status'>;
