import Fastify from 'fastify';
import fastifyHelmet from '@fastify/helmet';
import { RevenueService } from './revenue-service';

export function buildServer(revenueService: RevenueService) {
  const app = Fastify();
  app.register(fastifyHelmet);

  app.get('/health', async () => ({ status: 'ok' }));

  // TODO: extract organizerId from verified JWT once Gateway forwards auth context;
  // for now this is an open internal-only route
  app.get<{ Params: { organizerId: string } }>(
    '/revenue/:organizerId',
    async (req) => revenueService.forOrganizer(req.params.organizerId),
  );

  return app;
}
