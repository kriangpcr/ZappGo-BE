import { Order, OrderStatus } from '@domain/model';
import { Order as PrismaOrder } from '@prisma/client';

export class PrismaOrderMapper {
  public static toPrisma(order: Partial<Order>): PrismaOrder {
    return {
      id: order.id,
      restaurant_id: order.restaurant_id,
      user_id: order.user_id,
      address_id: order.address_id,
      status: order.status,
      total_price: order.total_price,
      created_at: order.created_at,
      updated_at: order.updated_at,
    };
  }

  public static toDomain(order: PrismaOrder): Order {
    if (!order) return null;
    return Order.reconstitute({
      ...order,
      status: order.status as OrderStatus,
    });
  }
}
