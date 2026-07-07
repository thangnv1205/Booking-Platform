import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserEntity } from './app/entities/user.entity';

/**
 * TypeORM CLI entrypoint — separate from app.module.ts's TypeOrmModule.forRoot
 * because the CLI needs a plain DataSource, not a Nest-wrapped one. Used via:
 *   pnpm exec typeorm-ts-node-commonjs migration:generate -d apps/auth-service/src/data-source.ts apps/auth-service/src/migrations/Init
 *   pnpm exec typeorm-ts-node-commonjs migration:run -d apps/auth-service/src/data-source.ts
 *
 * TODO: once the first migration is generated and reviewed, flip
 * `synchronize: true` to `false` in app.module.ts's TypeOrmModule.forRoot —
 * schema is still evolving here, and generating a migration against a moving
 * target just means regenerating it again right after.
 */
export default new DataSource({
  type: 'postgres',
  host: process.env['DB_HOST'] ?? 'localhost',
  port: Number(process.env['DB_PORT'] ?? 5442),
  username: process.env['DB_USERNAME'] ?? 'postgres',
  password: process.env['DB_PASSWORD'] ?? 'postgres',
  database: process.env['DB_NAME'] ?? 'auth_db',
  entities: [UserEntity],
  migrations: ['apps/auth-service/src/migrations/*.ts'],
});
