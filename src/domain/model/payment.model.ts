export enum PaymentMethod {
  PROMPTPAY = 'PROMPTPAY',
  CREDIT_CARD = 'CREDIT_CARD',
}

export enum PaymentStatus {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export interface PaymentProps {
  id?: string;
  order_id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  paid_at?: Date | null;
}

export class Payment {
  readonly id?: string;
  readonly order_id: string;
  readonly method: PaymentMethod;
  readonly status: PaymentStatus;
  readonly paid_at?: Date | null;

  private constructor(props: PaymentProps) {
    this.id = props.id;
    this.order_id = props.order_id;
    this.method = props.method;
    this.status = props.status;
    this.paid_at = props.paid_at ?? null;
  }

  static create(
    props: Omit<PaymentProps, 'id'>,
  ): Payment {
    return new Payment(props);
  }

  static reconstitute(props: Required<PaymentProps>): Payment {
    return new Payment(props);
  }

  get isSuccessful(): boolean {
    return this.status === PaymentStatus.SUCCESS;
  }

  get isFailed(): boolean {
    return this.status === PaymentStatus.FAIL;
  }

  get isPaid(): boolean {
    return this.isSuccessful && this.paid_at !== null;
  }
}
