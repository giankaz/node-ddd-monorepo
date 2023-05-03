import { Activity } from '../entities';
import { ActivityInput } from '../../application';

export class CreateActivityFactory {
  public static create(input: ActivityInput): Activity {
    return new Activity(input);
  }
}
