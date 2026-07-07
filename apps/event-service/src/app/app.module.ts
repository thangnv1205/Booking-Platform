import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '@booking-platform/auth';
import { EventEntity } from './entities/event.entity';
import { TicketTierEntity } from './entities/ticket-tier.entity';
import { EventController } from './event.controller';
import { InternalTicketTierController } from './internal-ticket-tier.controller';
import { EventService } from './event.service';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env['DB_HOST'] ?? 'localhost',
      port: Number(process.env['DB_PORT'] ?? 5442),
      username: process.env['DB_USERNAME'] ?? 'postgres',
      password: process.env['DB_PASSWORD'] ?? 'postgres',
      database: process.env['DB_NAME'] ?? 'event_db',
      entities: [EventEntity, TicketTierEntity],
      // TODO: switch to migrations before anything resembling production use
      synchronize: true,
      // TODO: bulkhead — cap this pool (extra: { max: N }); also give the Redis
      // cache-aside client its own separate connection/pool so a Redis outage
      // degrades to DB reads instead of also blocking on a shared client
    }),
    TypeOrmModule.forFeature([EventEntity, TicketTierEntity]),
  ],
  controllers: [
    EventController,
    InternalTicketTierController,
    HealthController,
  ],
  providers: [EventService, JwtStrategy],
})
export class AppModule {}
