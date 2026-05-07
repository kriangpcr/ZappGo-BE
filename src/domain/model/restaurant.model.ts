export enum RestaurantStatus {
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  BUSY = 'BUSY',
  OFFLINE = 'OFFLINE',
}

export interface RestaurantProps {
  id?: string;
  name: string;
  description?: string | null;
  open_time?: Date | null;
  close_time?: Date | null;
  status?: RestaurantStatus;
}

export class Restaurant {
  readonly id?: string;
  readonly name: string;
  readonly description?: string | null;
  readonly open_time?: Date | null;
  readonly close_time?: Date | null;
  readonly status: RestaurantStatus;

  private constructor(props: RestaurantProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description ?? null;
    this.open_time = props.open_time ?? null;
    this.close_time = props.close_time ?? null;
    this.status = props.status ?? RestaurantStatus.CLOSED;
  }

  static create(
    props: Omit<RestaurantProps, 'id'>,
  ): Restaurant {
    return new Restaurant(props);
  }

  static reconstitute(props: Required<RestaurantProps>): Restaurant {
    return new Restaurant(props);
  }

  get isOpen(): boolean {
    return this.status === RestaurantStatus.OPEN;
  }

  get isAcceptingOrders(): boolean {
    return (
      this.status === RestaurantStatus.OPEN ||
      this.status === RestaurantStatus.BUSY
    );
  }
}
