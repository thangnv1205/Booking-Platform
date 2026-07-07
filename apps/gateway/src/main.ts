import { initTracing } from '@booking-platform/observability';
initTracing('gateway');

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
  // Gateway is the only public entrypoint — internal services aren't called from browsers.
  app.enableCors();
  app.enableShutdownHooks();

  const { httpMiddleware, metricsHandler } = createServiceMetrics('gateway');
  app.use(httpMiddleware);
  app.getHttpAdapter().get('/metrics', metricsHandler);

  const port = Number(process.env['PORT'] ?? 4000);
  await app.listen(port);

  const logger = createLogger('gateway');
  logger.info(`gateway listening on :${port}`);
}

bootstrap();
