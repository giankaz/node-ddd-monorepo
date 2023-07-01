import { PropsTypes } from './types';

export type Choices = {
  title: string;
  value: PropsTypes;
};

export const choices: Choices[] = [
  { title: 'string   🔠\n', value: 'string' },
  { title: 'number   🔢\n', value: 'number' },
  { title: 'Date     📅\n', value: 'Date' },
  { title: 'boolean  ❓\n', value: 'boolean' },
  { title: 'object   🤨\n', value: 'object' },
  { title: 'string[] 🔠\n', value: 'string[]' },
  { title: 'number[] 🔢\n', value: 'number[]' },
];
