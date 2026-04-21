import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { TransformInterceptor } from '@infrastructure/common/interceptors/transform.interceptor';
import { AllExceptionFilter } from '@infrastructure/common/filter/exception.filter';
import { LoggerService } from '@infrastructure/logger/logger.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('BACKEND')
    .setDescription('The BACKEND API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(EnvironmentConfigService);

  app.setGlobalPrefix(configService.getPrefix());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  const PORT = configService.getPort();
  await app.listen(PORT ?? 3000);
}
bootstrap();
