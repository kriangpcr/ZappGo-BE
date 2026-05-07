export interface CartItemProps {
  id?: string;
  quantity: number;
  menu_id: string;
  cart_id: string;
}

export class CartItem {
  readonly id?: string;
  readonly quantity: number;
  readonly menu_id: string;
  readonly cart_id: string;

  private constructor(props: CartItemProps) {
    this.id = props.id;
    this.quantity = props.quantity;
    this.menu_id = props.menu_id;
    this.cart_id = props.cart_id;
  }

  static create(
    props: Omit<CartItemProps, 'id'>,
  ): CartItem {
    if (props.quantity <= 0) {
      throw new Error('CartItem quantity must be greater than 0');
    }
    return new CartItem(props);
  }

  static reconstitute(props: Required<CartItemProps>): CartItem {
    return new CartItem(props);
  }

  get isValidQuantity(): boolean {
    return this.quantity > 0;
  }
}
