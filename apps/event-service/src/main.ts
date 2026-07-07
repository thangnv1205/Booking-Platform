import { initTracing } from '@booking-platform/observability';
initTracing('event-service');

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
    createServiceMetrics('event-service');
  app.use(httpMiddleware);
  app.getHttpAdapter().get('/metrics', metricsHandler);

  const port = Number(process.env['PORT'] ?? 4002);
  await app.listen(port);

  const logger = createLogger('event-service');
  logger.info(`event-service listening on :${port}`);
}

bootstrap();
