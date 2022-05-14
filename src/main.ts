import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { config } from './config/config';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from './components/user/user.module';
import { version, description } from '../package.json';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { OrderModule } from './components/order/order.module';
import { ProductModule } from './components/product/product.module';
import { OrderProductModule } from './components/order-product/order-product.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      skipMissingProperties: false,
    }),
  );

  app.useStaticAssets(join(__dirname, '..', '..', 'files'), {
    prefix: '/files/',
  });

  //#region Swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Elkarzabal')
    .setDescription(description)
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    })
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [
      UserModule,
      AppModule,
      OrderModule,
      OrderProductModule,
      ProductModule,
    ],
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('doc', app, document, {
    swaggerOptions: { filter: true, defaultModelsExpandDepth: -1 },
  });
  //#endregion

  await app.listen(configService.get(config.api.port), () => {
    console.log(
      `SERVER READY ON http://${configService.get(
        config.api.host,
      )}:${configService.get(config.api.port)}`,
    );
  });
}
bootstrap();
