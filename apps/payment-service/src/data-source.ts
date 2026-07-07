import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { OutboxEntity } from '@booking-platform/outbox';
import { PaymentEntity } from './app/entities/payment.entity';

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
  database: process.env['DB_NAME'] ?? 'payment_db',
  entities: [PaymentEntity, OutboxEntity],
  migrations: ['apps/payment-service/src/migrations/*.ts'],
});
