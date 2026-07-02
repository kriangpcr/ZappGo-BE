import { OrderItem } from '@domain/model';
import { OrderItem as PrismaOrderItem } from '@prisma/client';

export class PrismaOrderItemMapper {
  public static toPrisma(orderItem: Partial<OrderItem>): PrismaOrderItem {
    return {
      id: orderItem.id,
      menu_id: orderItem.menu_id,
      order_id: orderItem.order_id,
      restaurant_name: orderItem.restaurant_name,
      menu_name: orderItem.menu_name,
      price: orderItem.price,
      quantity: orderItem.quantity,
      subtotal: orderItem.subtotal,
      created_at: orderItem.created_at,
    };
  }

  public static toDomain(orderItem: PrismaOrderItem): OrderItem {
    if (!orderItem) return null;
    return OrderItem.reconstitute(orderItem as Required<typeof orderItem>);
  }
}
