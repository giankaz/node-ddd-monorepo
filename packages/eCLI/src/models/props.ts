import { PropsTypes } from './types';

export type Props = {
  [key: string]: PropsTypes | Props;
};
