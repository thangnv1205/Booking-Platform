import { initTracing } from '@booking-platform/observability';
initTracing('payment-service');

import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  createLogger,
  createServiceMetrics,
} from '@booking-platform/observability';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(helmet());
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const { httpMiddleware, metricsHandler } =
    createServiceMetrics('payment-service');
  app.use(httpMiddleware);
  app.getHttpAdapter().get('/metrics', metricsHandler);

  const port = Number(process.env['PORT'] ?? 4004);
  await app.listen(port);

  const logger = createLogger('payment-service');
  logger.info(`payment-service listening on :${port}`);
}

bootstrap();
