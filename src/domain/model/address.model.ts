export interface AddressProps {
  id?: string;
  house_no?: string | null;
  village_moo?: string | null;
  lane_alley?: string | null;
  road?: string | null;
  sub_district?: string | null;
  district?: string | null;
  province?: string | null;
  postal_code?: string | null;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
}

export class Address {
  readonly id?: string;
  readonly house_no?: string | null;
  readonly village_moo?: string | null;
  readonly lane_alley?: string | null;
  readonly road?: string | null;
  readonly sub_district?: string | null;
  readonly district?: string | null;
  readonly province?: string | null;
  readonly postal_code?: string | null;
  readonly user_id: string;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  private constructor(props: AddressProps) {
    this.id = props.id;
    this.house_no = props.house_no ?? null;
    this.village_moo = props.village_moo ?? null;
    this.lane_alley = props.lane_alley ?? null;
    this.road = props.road ?? null;
    this.sub_district = props.sub_district ?? null;
    this.district = props.district ?? null;
    this.province = props.province ?? null;
    this.postal_code = props.postal_code ?? null;
    this.user_id = props.user_id;
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  static create(
    props: Omit<AddressProps, 'id' | 'created_at' | 'updated_at'>,
  ): Address {
    return new Address(props);
  }

  static reconstitute(props: Required<AddressProps>): Address {
    return new Address(props);
  }

  /**
   * คืนที่อยู่แบบ string เรียงต่อกัน (ข้ามค่า null)
   */
  get fullAddress(): string {
    return [
      this.house_no,
      this.village_moo,
      this.lane_alley,
      this.road,
      this.sub_district,
      this.district,
      this.province,
      this.postal_code,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
