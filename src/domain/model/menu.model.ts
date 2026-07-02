export enum MenuStatus {
  AVAILABLE = 'AVAILABLE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
}

export interface MenuProps {
  id?: string;
  name: string;
  price: number;
  description?: string | null;
  image_id?: string | null;
  status?: MenuStatus;
  restaurant_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Menu {
  readonly id?: string;
  readonly name: string;
  readonly price: number;
  readonly description?: string | null;
  readonly image_id?: string | null;
  readonly status: MenuStatus;
  readonly restaurant_id: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: MenuProps) {
    this.id = props.id;
    this.name = props.name;
    this.price = props.price;
    this.description = props.description ?? null;
    this.image_id = props.image_id ?? null;
    this.status = props.status ?? MenuStatus.AVAILABLE;
    this.restaurant_id = props.restaurant_id;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(props: Omit<MenuProps, 'id'>): Menu {
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
