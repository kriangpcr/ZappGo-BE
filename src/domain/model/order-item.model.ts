export interface OrderItemProps {
  id?: string;
  menu_id: string;
  order_id: string;
  restaurant_name: string;
  menu_name: string;
  price: number;
  quantity: number;
  subtotal: number;
  created_at?: Date;
}

export class OrderItem {
  readonly id?: string;
  readonly menu_id: string;
  readonly order_id: string;
  readonly restaurant_name: string;
  readonly menu_name: string;
  readonly price: number;
  readonly quantity: number;
  readonly subtotal: number;
  readonly created_at?: Date;

  private constructor(props: OrderItemProps) {
    this.id = props.id;
    this.menu_id = props.menu_id;
    this.order_id = props.order_id;
    this.restaurant_name = props.restaurant_name;
    this.menu_name = props.menu_name;
    this.price = props.price;
    this.quantity = props.quantity;
    this.subtotal = props.subtotal;
    this.created_at = props.created_at;
  }

  static create(
    props: Omit<OrderItemProps, 'id' | 'created_at'>,
  ): OrderItem {
    const subtotal = props.price * props.quantity;
    return new OrderItem({ ...props, subtotal });
  }

  static reconstitute(props: Required<OrderItemProps>): OrderItem {
    return new OrderItem(props);
  }

  /**
   * คำนวณ subtotal ใหม่ตาม price × quantity
   * (ใช้ตรวจสอบความถูกต้องของข้อมูล)
   */
  get calculatedSubtotal(): number {
    return this.price * this.quantity;
  }
}
