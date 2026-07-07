import {
  collectDefaultMetrics,
  Counter,
  Histogram,
  Registry,
} from 'prom-client';
import type { NextFunction, Request, Response } from 'express';

export interface ServiceMetrics {
  registry: Registry;
  httpMiddleware: (req: Request, res: Response, next: NextFunction) => void;
  metricsHandler: (req: Request, res: Response) => Promise<void>;
}

/** One registry + a couple of RED-method metrics per service, scraped by Prometheus at `/metrics`. */
export function createServiceMetrics(serviceName: string): ServiceMetrics {
  const registry = new Registry();
  registry.setDefaultLabels({ job: serviceName });
  collectDefaultMetrics({ register: registry });

  const httpRequestsTotal = new Counter({
    name: 'http_requests_total',
    help: 'Total HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [registry],
  });

  const httpRequestDurationSeconds = new Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.01, 0.05, 0.1, 0.15, 0.3, 0.5, 1, 2, 5],
    registers: [registry],
  });

  const httpMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const stopTimer = process.hrtime.bigint();
    res.on('finish', () => {
      const durationSeconds = Number(process.hrtime.bigint() - stopTimer) / 1e9;
      const route = req.route?.path ?? req.path ?? 'unknown';
      const labels = {
        method: req.method,
        route,
        status_code: String(res.statusCode),
      };
      httpRequestsTotal.inc(labels);
      httpRequestDurationSeconds.observe(labels, durationSeconds);
    });
    next();
  };

  const metricsHandler = async (_req: Request, res: Response) => {
    res.setHeader('Content-Type', registry.contentType);
    res.send(await registry.metrics());
  };

  return { registry, httpMiddleware, metricsHandler };
}
