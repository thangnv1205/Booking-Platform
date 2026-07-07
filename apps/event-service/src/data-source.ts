import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { EventEntity } from './app/entities/event.entity';
import { TicketTierEntity } from './app/entities/ticket-tier.entity';

/**
 * TypeORM CLI entrypoint, see apps/auth-service/src/data-source.ts for usage
 * and the synchronize:true -> migrations cutover note.
 */
export default new DataSource({
  type: 'postgres',
  host: process.env['DB_HOST'] ?? 'localhost',
  port: Number(process.env['DB_PORT'] ?? 5442),
  username: process.env['DB_USERNAME'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? 'postgres',
  database: process.env['DB_NAME'] ?? 'event_db',
  entities: [EventEntity, TicketTierEntity],
  migrations: ['apps/event-service/src/migrations/*.ts'],
});
