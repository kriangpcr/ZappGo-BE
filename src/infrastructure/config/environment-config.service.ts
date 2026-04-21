import { EnvironmentConfig } from '@domain/config';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentConfigService implements EnvironmentConfig {
  constructor(private readonly configService: ConfigService) { }
  getPort(): number {
    return this.configService.get<number>('PORT');
  }
  getPrefix(): string {
    return this.configService.get<string>('PREFIX');
  }
}
