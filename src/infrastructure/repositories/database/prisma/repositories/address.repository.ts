import { AddressRepository } from '@domain/repositories/database';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { Address } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaAddressMapper } from '../mapper/address.mapper';

@Injectable()
export class PrismaAddressRepository
  extends PrismaRepository
  implements AddressRepository
{
  async getByUserId(userId: string): Promise<Address[]> {
    return this.getConnection(null)
      .address.findMany({ where: { user_id: userId } })
      .then((addresses) => addresses.map(PrismaAddressMapper.toDomain));
  }

  async getAll(tx?: PrismaTransaction): Promise<Address[]> {
    return this.getConnection(tx)
      .address.findMany()
      .then((addresses) => addresses.map(PrismaAddressMapper.toDomain));
  }

  async getById(id: string, tx?: PrismaTransaction): Promise<Address> {
    return this.getConnection(tx)
      .address.findUnique({ where: { id } })
      .then(PrismaAddressMapper.toDomain);
  }

  async create(entity: Address, tx?: PrismaTransaction): Promise<Address> {
    return this.getConnection(tx)
      .address.create({ data: PrismaAddressMapper.toPrisma(entity) })
      .then(PrismaAddressMapper.toDomain);
  }

  async createMany(
    entities: Address[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).address.createMany({
      data: entities.map(PrismaAddressMapper.toPrisma),
    });
  }

  async update(entity: Address, tx?: PrismaTransaction): Promise<Address> {
    return this.getConnection(tx)
      .address.update({
        where: { id: entity.id },
        data: PrismaAddressMapper.toPrisma(entity),
      })
      .then(PrismaAddressMapper.toDomain);
  }

  async remove(id: string, tx?: PrismaTransaction): Promise<Address> {
    return this.getConnection(tx)
      .address.delete({ where: { id } })
      .then(PrismaAddressMapper.toDomain);
  }
}
