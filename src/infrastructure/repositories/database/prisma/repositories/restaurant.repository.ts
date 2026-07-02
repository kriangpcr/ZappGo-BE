import { RestaurantRepository } from '@domain/repositories/database';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { Restaurant, RestaurantStatus } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaRestaurantMapper } from '../mapper/restaurant.mapper';

@Injectable()
export class PrismaRestaurantRepository
  extends PrismaRepository
  implements RestaurantRepository
{
  async getByStatus(status: RestaurantStatus): Promise<Restaurant[]> {
    return this.getConnection(null)
      .restaurant.findMany({ where: { status } })
      .then((restaurants) => restaurants.map(PrismaRestaurantMapper.toDomain));
  }

  async getByName(name: string): Promise<Restaurant | null> {
    return this.getConnection(null)
      .restaurant.findFirst({ where: { name } })
      .then(PrismaRestaurantMapper.toDomain);
  }

  async getAll(tx?: PrismaTransaction): Promise<Restaurant[]> {
    return this.getConnection(tx)
      .restaurant.findMany()
      .then((restaurants) => restaurants.map(PrismaRestaurantMapper.toDomain));
  }

  async getById(id: string, tx?: PrismaTransaction): Promise<Restaurant> {
    return this.getConnection(tx)
      .restaurant.findUnique({ where: { id } })
      .then(PrismaRestaurantMapper.toDomain);
  }

  async create(
    entity: Restaurant,
    tx?: PrismaTransaction,
  ): Promise<Restaurant> {
    return this.getConnection(tx)
      .restaurant.create({ data: PrismaRestaurantMapper.toPrisma(entity) })
      .then(PrismaRestaurantMapper.toDomain);
  }

  async createMany(
    entities: Restaurant[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).restaurant.createMany({
      data: entities.map(PrismaRestaurantMapper.toPrisma),
    });
  }

  async update(
    entity: Restaurant,
    tx?: PrismaTransaction,
  ): Promise<Restaurant> {
    return this.getConnection(tx)
      .restaurant.update({
        where: { id: entity.id },
        data: PrismaRestaurantMapper.toPrisma(entity),
      })
      .then(PrismaRestaurantMapper.toDomain);
  }

  async remove(id: string, tx?: PrismaTransaction): Promise<Restaurant> {
    return this.getConnection(tx)
      .restaurant.delete({ where: { id } })
      .then(PrismaRestaurantMapper.toDomain);
  }
}
