import { IActivity } from './activity.dto';

export type ActivityInput = Omit<IActivity, 'id'>;
