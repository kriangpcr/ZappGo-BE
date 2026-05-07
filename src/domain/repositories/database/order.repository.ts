import { Order, OrderStatus } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class OrderRepository extends IGenericRepository<Order> {
  abstract getByUserId(userId: string): Promise<Order[]>;
  abstract getByRestaurantId(restaurantId: string): Promise<Order[]>;
  abstract getByStatus(status: OrderStatus): Promise<Order[]>;
}
