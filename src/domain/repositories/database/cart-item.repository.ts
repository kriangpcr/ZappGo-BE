import { CartItem } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class CartItemRepository extends IGenericRepository<CartItem> {
  abstract getByCartId(cartId: string): Promise<CartItem[]>;
}
