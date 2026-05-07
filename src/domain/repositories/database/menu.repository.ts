import { Menu } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class MenuRepository extends IGenericRepository<Menu> {
  abstract getByRestaurantId(restaurantId: string): Promise<Menu[]>;
}
