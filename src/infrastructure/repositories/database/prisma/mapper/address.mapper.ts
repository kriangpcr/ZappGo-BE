import { Address } from '@domain/model';
import { Address as PrismaAddress } from '@prisma/client';

export class PrismaAddressMapper {
  public static toPrisma(address: Partial<Address>): PrismaAddress {
    return {
      id: address.id,
      house_no: address.house_no,
      village_moo: address.village_moo,
      lane_alley: address.lane_alley,
      road: address.road,
      sub_district: address.sub_district,
      district: address.district,
      province: address.province,
      postal_code: address.postal_code,
      user_id: address.user_id,
      created_at: address.created_at,
      updated_at: address.updated_at,
    };
  }

  public static toDomain(address: PrismaAddress): Address {
    if (!address) return null;
    return Address.reconstitute(address as Required<typeof address>);
  }
}
