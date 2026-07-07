import { initTracing } from '@booking-platform/observability';
initTracing('notification-service');

import helmet from 'helmet';
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

  const { httpMiddleware, metricsHandler } = createServiceMetrics(
    'notification-service',
  );
  app.use(httpMiddleware);
  app.getHttpAdapter().get('/metrics', metricsHandler);

  const port = Number(process.env['PORT'] ?? 4005);
  await app.listen(port);

  const logger = createLogger('notification-service');
  logger.info(`notification-service listening on :${port}`);
}

bootstrap();
