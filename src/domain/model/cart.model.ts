export interface CartProps {
  id?: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Cart {
  readonly id?: string;
  readonly user_id: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: CartProps) {
    this.id = props.id;
    this.user_id = props.user_id;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(
    props: Omit<CartProps, 'id' | 'created_at' | 'updated_at'>,
  ): Cart {
    return new Cart(props);
  }

  static reconstitute(props: Required<CartProps>): Cart {
    return new Cart(props);
  }
}
