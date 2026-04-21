import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { UserUsecasesProxyModule } from '@infrastructure/usecases-proxy/user-usecases-proxy.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller.module';
@Module({
  imports: [UserUsecasesProxyModule.register()],
  controllers: [UserController],
})
export class ControllersModule {}
