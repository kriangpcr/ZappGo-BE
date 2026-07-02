import { Menu, MenuStatus } from '@domain/model';
import { Menu as PrismaMenu } from '@prisma/client';

export class PrismaMenuMapper {
  public static toPrisma(menu: Partial<Menu>): PrismaMenu {
    return {
      id: menu.id,
      name: menu.name,
      price: menu.price,
      description: menu.description,
      picture_id: menu.picture_id,
      status: menu.status,
      restaurant_id: menu.restaurant_id,
    };
  }

  public static toDomain(menu: PrismaMenu): Menu {
    if (!menu) return null;
    return Menu.reconstitute({
      ...menu,
      status: menu.status as MenuStatus,
    });
  }
}
