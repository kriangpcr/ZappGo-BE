import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { MenuRepository } from '@domain/repositories/database';
@Injectable()
export class GetMenuUseCase implements UseCase<
  {
    id: string;
  },
  any
> {
  constructor(private readonly menuRepository: MenuRepository) {}

  async execute(ctx: { id: string }): Promise<any> {
    const menu = await this.menuRepository.getById(ctx.id);
    if (!menu) {
      throw new BadRequestException('Menu not found');
    }
    return menu;
  }
}
