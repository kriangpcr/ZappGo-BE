import { OrderRepository } from '@domain/repositories/database';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { Order, OrderStatus } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaOrderMapper } from '../mapper/order.mapper';

@Injectable()
export class PrismaOrderRepository
  extends PrismaRepository
  implements OrderRepository
{
  async getByUserId(userId: string): Promise<Order[]> {
    return this.getConnection(null)
      .order.findMany({ where: { user_id: userId } })
      .then((orders) => orders.map(PrismaOrderMapper.toDomain));
  }

  async getByRestaurantId(restaurantId: string): Promise<Order[]> {
    return this.getConnection(null)
      .order.findMany({ where: { restaurant_id: restaurantId } })
      .then((orders) => orders.map(PrismaOrderMapper.toDomain));
  }

  async getByStatus(status: OrderStatus): Promise<Order[]> {
    return this.getConnection(null)
      .order.findMany({ where: { status } })
      .then((orders) => orders.map(PrismaOrderMapper.toDomain));
  }

  async getAll(tx?: PrismaTransaction): Promise<Order[]> {
    return this.getConnection(tx)
      .order.findMany()
      .then((orders) => orders.map(PrismaOrderMapper.toDomain));
  }

  async getById(id: string, tx?: PrismaTransaction): Promise<Order> {
    return this.getConnection(tx)
      .order.findUnique({ where: { id } })
      .then(PrismaOrderMapper.toDomain);
  }

  async create(entity: Order, tx?: PrismaTransaction): Promise<Order> {
    return this.getConnection(tx)
      .order.create({ data: PrismaOrderMapper.toPrisma(entity) })
      .then(PrismaOrderMapper.toDomain);
  }

  async createMany(
    entities: Order[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).order.createMany({
      data: entities.map(PrismaOrderMapper.toPrisma),
    });
  }

  async update(entity: Order, tx?: PrismaTransaction): Promise<Order> {
    return this.getConnection(tx)
      .order.update({
        where: { id: entity.id },
        data: PrismaOrderMapper.toPrisma(entity),
      })
      .then(PrismaOrderMapper.toDomain);
  }

  async remove(id: string, tx?: PrismaTransaction): Promise<Order> {
    return this.getConnection(tx)
      .order.delete({ where: { id } })
      .then(PrismaOrderMapper.toDomain);
  }
}
