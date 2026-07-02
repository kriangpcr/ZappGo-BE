import { Menu, MenuStatus } from '@domain/model';
import { Menu as PrismaMenu } from '@prisma/client';

export class PrismaMenuMapper {
  public static toPrisma(menu: Partial<Menu>): PrismaMenu {
    return {
      id: menu.id,
      name: menu.name,
      price: menu.price,
      description: menu.description,
      image_id: menu.image_id,
      status: menu.status,
      restaurant_id: menu.restaurant_id,
      created_at: menu.created_at,
      updated_at: menu.updated_at,
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
