import { Cart } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class CartRepository extends IGenericRepository<Cart> {
  abstract getByUserId(userId: string): Promise<Cart | null>;
}
