import { OrderItem } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class OrderItemRepository extends IGenericRepository<OrderItem> {
  abstract getByOrderId(orderId: string): Promise<OrderItem[]>;
}
