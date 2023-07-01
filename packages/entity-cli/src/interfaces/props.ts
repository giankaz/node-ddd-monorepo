import { PropsTypes } from './types';

export interface Props {
  [key: string]: PropsTypes | Props;
}
