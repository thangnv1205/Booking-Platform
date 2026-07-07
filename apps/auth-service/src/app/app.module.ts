import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthModule } from './auth.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['DB_HOST'] ?? 'localhost',
      port: Number(process.env['DB_PORT'] ?? 5442),
      username: process.env['DB_USERNAME'] ?? 'postgres',
      password: process.env['DB_PASSWORD'] ?? 'postgres',
      database: process.env['DB_NAME'] ?? 'auth_db',
      entities: [UserEntity],
      // TODO: switch to migrations before anything resembling production use
      synchronize: true,
      // TODO: bulkhead — cap this pool (extra: { max: N }) so a slow/exhausted
      // Postgres connection can't starve every other request path in this service
    }),
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
