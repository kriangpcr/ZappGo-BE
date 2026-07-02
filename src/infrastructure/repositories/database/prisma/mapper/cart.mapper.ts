import { Cart } from '@domain/model';
import { Cart as PrismaCart } from '@prisma/client';

export class PrismaCartMapper {
  public static toPrisma(cart: Partial<Cart>): PrismaCart {
    return {
      id: cart.id,
      user_id: cart.user_id,
      created_at: cart.created_at,
      updated_at: cart.updated_at,
    };
  }

  public static toDomain(cart: PrismaCart): Cart {
    if (!cart) return null;
    return Cart.reconstitute(cart as Required<typeof cart>);
  }
}
