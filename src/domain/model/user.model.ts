export interface UserProps {
  id?: string;
  prefix?: string | null;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string | null;
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  readonly id?: string;
  readonly prefix?: string | null;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly password: string;
  readonly phone?: string | null;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: UserProps) {
    this.id = props.id;
    this.prefix = props.prefix ?? null;
    this.first_name = props.first_name;
    this.last_name = props.last_name;
    this.email = props.email;
    this.password = props.password;
    this.phone = props.phone ?? null;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  /**
   * Factory method — สร้าง User ใหม่ (ยังไม่มี id, timestamps จะถูกกำหนดโดย DB)
   */
  static create(
    props: Omit<UserProps, 'id' | 'created_at' | 'updated_at'>,
  ): User {
    return new User(props);
  }

  /**
   * Factory method — สร้าง User จากข้อมูลที่ดึงมาจาก DB (Reconstitute)
   */
  static reconstitute(props: Required<UserProps>): User {
    return new User(props);
  }

  get fullName(): string {
    const prefix = this.prefix ? `${this.prefix} ` : '';
    return `${prefix}${this.first_name} ${this.last_name}`.trim();
  }
}
