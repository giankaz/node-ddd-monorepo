import { Entity } from '../../../shared';
import { ActivityModel } from '../models';

export class Activity extends Entity<ActivityModel> implements ActivityModel {
  constructor(props: ActivityModel) {
    super(props, ActivityModel);
  }

  get data(): string {
    return this.props.data;
  }

  set data(newData: string) {
    this.props.data = newData;
    this.update();
  }

  get data_type(): string {
    return this.props.data_type;
  }

  set data_type(newData_type: string) {
    this.props.data_type = newData_type;
    this.update();
  }

  get account_id(): string {
    return this.props.account_id;
  }

  set account_id(newAccount_id: string) {
    this.props.account_id = newAccount_id;
    this.update();
  }

  get origin(): string {
    return this.props.origin;
  }

  set origin(newOrigin: string) {
    this.props.origin = newOrigin;
    this.update();
  }

  get story_points(): number {
    return this.props.story_points;
  }

  set story_points(newStory_points: number) {
    this.props.story_points = newStory_points;
    this.update();
  }

  get type(): string {
    return this.props.type;
  }

  set type(newType: string) {
    this.props.type = newType;
    this.update();
  }

  get lead_id(): string {
    return this.props.lead_id;
  }

  set lead_id(newLead_id: string) {
    this.props.lead_id = newLead_id;
    this.update();
  }
}
