import { IExample } from './example.dto';

export type ExampleInput = Omit<IExample, 'id'>;
