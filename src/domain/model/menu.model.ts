export enum MenuStatus {
  AVAILABLE = 'AVAILABLE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface MenuProps {
  id?: string;
  name: string;
  price: number;
  description?: string | null;
  picture_id?: string | null;
  status?: MenuStatus;
  restaurant_id: string;
}

export class Menu {
  readonly id?: string;
  readonly name: string;
  readonly price: number;
  readonly description?: string | null;
  readonly picture_id?: string | null;
  readonly status: MenuStatus;
  readonly restaurant_id: string;

  private constructor(props: MenuProps) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.description = props.description ?? null;
    this.picture_id = props.picture_id ?? null;
    this.status = props.status ?? MenuStatus.AVAILABLE;
    this.restaurant_id = props.restaurant_id;
  }

  static create(
    props: Omit<MenuProps, 'id'>,
  ): Menu {
    return new Menu(props);
  }

  static reconstitute(props: Required<MenuProps>): Menu {
    return new Menu(props);
  }

  get isAvailable(): boolean {
    return this.status === MenuStatus.AVAILABLE;
  }

  /**
   * ตรวจสอบว่า price ถูกต้อง (ต้องมากกว่า 0)
   */
  get isValidPrice(): boolean {
    return this.price > 0;
  }
}
