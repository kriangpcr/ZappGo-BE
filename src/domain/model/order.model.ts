export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COOKING = 'COOKING',
  DELIVERING = 'DELIVERING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface OrderProps {
  id?: string;
  restaurant_id: string;
  user_id: string;
  address_id: string;
  status?: OrderStatus;
  total_price: number;
  created_at?: Date;
  updated_at?: Date;
}

export class Order {
  readonly id?: string;
  readonly restaurant_id: string;
  readonly user_id: string;
  readonly address_id: string;
  readonly status: OrderStatus;
  readonly total_price: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: OrderProps) {
    this.id = props.id;
    this.restaurant_id = props.restaurant_id;
    this.user_id = props.user_id;
    this.address_id = props.address_id;
    this.status = props.status ?? OrderStatus.PENDING;
    this.total_price = props.total_price;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(
    props: Omit<OrderProps, 'id' | 'created_at' | 'updated_at'>,
  ): Order {
    return new Order(props);
  }

  static reconstitute(props: Required<OrderProps>): Order {
    return new Order(props);
  }

  /** ยังสามารถยกเลิกได้หรือไม่ */
  get isCancelable(): boolean {
    return (
      this.status === OrderStatus.PENDING ||
      this.status === OrderStatus.CONFIRMED
    );
  }

  /** Order สำเร็จแล้ว */
  get isCompleted(): boolean {
    return this.status === OrderStatus.COMPLETED;
  }

  /** Order ถูกยกเลิก */
  get isCanceled(): boolean {
    return this.status === OrderStatus.CANCELED;
  }

  /** Order อยู่ในระหว่างดำเนินการ */
  get isActive(): boolean {
    return (
      this.status === OrderStatus.PENDING ||
      this.status === OrderStatus.CONFIRMED ||
      this.status === OrderStatus.COOKING ||
      this.status === OrderStatus.DELIVERING
    );
  }
}
