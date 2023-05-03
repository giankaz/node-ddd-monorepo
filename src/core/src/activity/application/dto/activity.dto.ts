import { ActivityModel } from '../../domain';

export type IActivity = Pick<ActivityModel, keyof ActivityModel>;
