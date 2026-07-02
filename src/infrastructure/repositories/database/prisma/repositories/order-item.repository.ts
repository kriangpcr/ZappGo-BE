import { OrderItemRepository } from '@domain/repositories/database';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { OrderItem } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaOrderItemMapper } from '../mapper/order-item.mapper';

@Injectable()
export class PrismaOrderItemRepository
  extends PrismaRepository
  implements OrderItemRepository
{
  async getByOrderId(orderId: string): Promise<OrderItem[]> {
    return this.getConnection(null)
      .orderItem.findMany({ where: { order_id: orderId } })
      .then((items) => items.map(PrismaOrderItemMapper.toDomain));
  }

  async getAll(tx?: PrismaTransaction): Promise<OrderItem[]> {
    return this.getConnection(tx)
      .orderItem.findMany()
      .then((items) => items.map(PrismaOrderItemMapper.toDomain));
  }

  async getById(id: string, tx?: PrismaTransaction): Promise<OrderItem> {
    return this.getConnection(tx)
      .orderItem.findUnique({ where: { id } })
      .then(PrismaOrderItemMapper.toDomain);
  }

  async create(entity: OrderItem, tx?: PrismaTransaction): Promise<OrderItem> {
    return this.getConnection(tx)
      .orderItem.create({ data: PrismaOrderItemMapper.toPrisma(entity) })
      .then(PrismaOrderItemMapper.toDomain);
  }

  async createMany(
    entities: OrderItem[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).orderItem.createMany({
      data: entities.map(PrismaOrderItemMapper.toPrisma),
    });
  }

  async update(entity: OrderItem, tx?: PrismaTransaction): Promise<OrderItem> {
    return this.getConnection(tx)
      .orderItem.update({
        where: { id: entity.id },
        data: PrismaOrderItemMapper.toPrisma(entity),
      })
      .then(PrismaOrderItemMapper.toDomain);
  }

  async remove(id: string, tx?: PrismaTransaction): Promise<OrderItem> {
    return this.getConnection(tx)
      .orderItem.delete({ where: { id } })
      .then(PrismaOrderItemMapper.toDomain);
  }
}
