import { CartItemRepository } from '@domain/repositories/database';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { CartItem } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaCartItemMapper } from '../mapper/cart-item.mapper';

@Injectable()
export class PrismaCartItemRepository
  extends PrismaRepository
  implements CartItemRepository
{
  async getByCartId(cartId: string): Promise<CartItem[]> {
    return this.getConnection(null)
      .cartItem.findMany({ where: { cart_id: cartId } })
      .then((items) => items.map(PrismaCartItemMapper.toDomain));
  }

  async getAll(tx?: PrismaTransaction): Promise<CartItem[]> {
    return this.getConnection(tx)
      .cartItem.findMany()
      .then((items) => items.map(PrismaCartItemMapper.toDomain));
  }

  async getById(id: string, tx?: PrismaTransaction): Promise<CartItem> {
    return this.getConnection(tx)
      .cartItem.findUnique({ where: { id } })
      .then(PrismaCartItemMapper.toDomain);
  }

  async create(entity: CartItem, tx?: PrismaTransaction): Promise<CartItem> {
    return this.getConnection(tx)
      .cartItem.create({ data: PrismaCartItemMapper.toPrisma(entity) })
      .then(PrismaCartItemMapper.toDomain);
  }

  async createMany(
    entities: CartItem[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).cartItem.createMany({
      data: entities.map(PrismaCartItemMapper.toPrisma),
    });
  }

  async update(entity: CartItem, tx?: PrismaTransaction): Promise<CartItem> {
    return this.getConnection(tx)
      .cartItem.update({
        where: { id: entity.id },
        data: PrismaCartItemMapper.toPrisma(entity),
      })
      .then(PrismaCartItemMapper.toDomain);
  }

  async remove(id: string, tx?: PrismaTransaction): Promise<CartItem> {
    return this.getConnection(tx)
      .cartItem.delete({ where: { id } })
      .then(PrismaCartItemMapper.toDomain);
  }
}
