import { CartItem } from '@domain/model';
import { CartItem as PrismaCartItem } from '@prisma/client';

export class PrismaCartItemMapper {
  public static toPrisma(cartItem: Partial<CartItem>): PrismaCartItem {
    return {
      id: cartItem.id,
      quantity: cartItem.quantity,
      menu_id: cartItem.menu_id,
      cart_id: cartItem.cart_id,
    };
  }

  public static toDomain(cartItem: PrismaCartItem): CartItem {
    if (!cartItem) return null;
    return CartItem.reconstitute(cartItem as Required<typeof cartItem>);
  }
}
