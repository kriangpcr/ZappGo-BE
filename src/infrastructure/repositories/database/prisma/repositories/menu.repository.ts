import { MenuRepository } from '@domain/repositories/database';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { Menu } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaMenuMapper } from '../mapper/menu.mapper';

@Injectable()
export class PrismaMenuRepository
  extends PrismaRepository
  implements MenuRepository
{
  async getByRestaurantId(restaurantId: string): Promise<Menu[]> {
    return this.getConnection(null)
      .menu.findMany({ where: { restaurant_id: restaurantId } })
      .then((menus) => menus.map(PrismaMenuMapper.toDomain));
  }

  async getAll(tx?: PrismaTransaction): Promise<Menu[]> {
    return this.getConnection(tx)
      .menu.findMany()
      .then((menus) => menus.map(PrismaMenuMapper.toDomain));
  }

  async getById(id: string, tx?: PrismaTransaction): Promise<Menu> {
    return this.getConnection(tx)
      .menu.findUnique({ where: { id } })
      .then(PrismaMenuMapper.toDomain);
  }

  async create(entity: Menu, tx?: PrismaTransaction): Promise<Menu> {
    return this.getConnection(tx)
      .menu.create({ data: PrismaMenuMapper.toPrisma(entity) })
      .then(PrismaMenuMapper.toDomain);
  }

  async createMany(
    entities: Menu[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).menu.createMany({
      data: entities.map(PrismaMenuMapper.toPrisma),
    });
  }

  async update(entity: Menu, tx?: PrismaTransaction): Promise<Menu> {
    return this.getConnection(tx)
      .menu.update({
        where: { id: entity.id },
        data: PrismaMenuMapper.toPrisma(entity),
      })
      .then(PrismaMenuMapper.toDomain);
  }

  async remove(id: string, tx?: PrismaTransaction): Promise<Menu> {
    return this.getConnection(tx)
      .menu.delete({ where: { id } })
      .then(PrismaMenuMapper.toDomain);
  }
}
