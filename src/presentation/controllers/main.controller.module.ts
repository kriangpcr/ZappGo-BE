import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller({ path: 'main' })
@ApiTags('Main')
export class MainController {
  constructor() {}

  @Get('/health')
  async getHealth() {
    return { message: 'OK' };
  }
}
