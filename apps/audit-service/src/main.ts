import { initTracing, createLogger } from '@booking-platform/observability';
initTracing('audit-service');

import { collectDefaultMetrics, Registry } from 'prom-client';
import { buildServer } from './http-server';
import { RevenueService } from './revenue-service';
import { AuditKafkaConsumer } from './kafka-consumer';

async function bootstrap() {
  const logger = createLogger('audit-service');

  const registry = new Registry();
  registry.setDefaultLabels({ job: 'audit-service' });
  collectDefaultMetrics({ register: registry });

  const revenueService = new RevenueService();
  const app = buildServer(revenueService);
  app.get('/metrics', async (_req, reply) => {
    reply.header('Content-Type', registry.contentType);
    return registry.metrics();
  });

  const consumer = new AuditKafkaConsumer();
  await consumer.start();

  const port = Number(process.env['PORT'] ?? 4006);
  await app.listen({ port, host: '0.0.0.0' });
  logger.info(`audit-service listening on :${port}`);

  process.on('SIGTERM', async () => {
    await consumer.stop();
    await app.close();
    process.exit(0);
  });
}

bootstrap();
