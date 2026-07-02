import { CartRepository } from '@domain/repositories/database';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { Cart } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaCartMapper } from '../mapper/cart.mapper';

@Injectable()
export class PrismaCartRepository
  extends PrismaRepository
  implements CartRepository
{
  async getByUserId(userId: string): Promise<Cart | null> {
    return this.getConnection(null)
      .cart.findFirst({ where: { user_id: userId } })
      .then(PrismaCartMapper.toDomain);
  }

  async getAll(tx?: PrismaTransaction): Promise<Cart[]> {
    return this.getConnection(tx)
      .cart.findMany()
      .then((carts) => carts.map(PrismaCartMapper.toDomain));
  }

  async getById(id: string, tx?: PrismaTransaction): Promise<Cart> {
    return this.getConnection(tx)
      .cart.findUnique({ where: { id } })
      .then(PrismaCartMapper.toDomain);
  }

  async create(entity: Cart, tx?: PrismaTransaction): Promise<Cart> {
    return this.getConnection(tx)
      .cart.create({ data: PrismaCartMapper.toPrisma(entity) })
      .then(PrismaCartMapper.toDomain);
  }

  async createMany(
    entities: Cart[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).cart.createMany({
      data: entities.map(PrismaCartMapper.toPrisma),
    });
  }

  async update(entity: Cart, tx?: PrismaTransaction): Promise<Cart> {
    return this.getConnection(tx)
      .cart.update({
        where: { id: entity.id },
        data: PrismaCartMapper.toPrisma(entity),
      })
      .then(PrismaCartMapper.toDomain);
  }

  async remove(id: string, tx?: PrismaTransaction): Promise<Cart> {
    return this.getConnection(tx)
      .cart.delete({ where: { id } })
      .then(PrismaCartMapper.toDomain);
  }
}
