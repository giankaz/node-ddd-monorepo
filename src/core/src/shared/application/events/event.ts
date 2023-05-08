interface IEvent<Data> {
  message_context: string;
  data: Data;
}

export class Event<Data> {
  public readonly message_type: string;
  public readonly message_context: string;
  public readonly ocurred_at: Date;
  public readonly data: Data;

  constructor({ data, message_context }: IEvent<Data>) {
    this.message_type = 'Event';
    this.message_context = message_context;
    this.data = data;
    this.ocurred_at = new Date();
  }
}
