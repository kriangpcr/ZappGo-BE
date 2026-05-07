import { Restaurant, RestaurantStatus } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class RestaurantRepository extends IGenericRepository<Restaurant> {
  abstract getByStatus(status: RestaurantStatus): Promise<Restaurant[]>;
  abstract getByName(name: string): Promise<Restaurant | null>;
}
