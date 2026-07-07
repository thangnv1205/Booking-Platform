import { EventEmitter } from 'node:events';
import { createServiceMetrics } from './metrics';

describe('createServiceMetrics', () => {
  it('records a request in the registry once the response finishes', async () => {
    const { httpMiddleware, registry } = createServiceMetrics('test-service');

    const res = new EventEmitter() as EventEmitter & { statusCode: number };
    res.statusCode = 200;
    const req = {
      method: 'GET',
      path: '/health',
      route: { path: '/health' },
    } as never;

    httpMiddleware(req, res as never, () => undefined);
    res.emit('finish');

    const output = await registry.metrics();
    expect(output).toContain('http_requests_total');
    expect(output).toMatch(/method="GET".*route="\/health".*status_code="200"/);
  });
});
