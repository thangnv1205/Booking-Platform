import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '@booking-platform/auth';
import { OutboxEntity } from '@booking-platform/outbox';
import { BookingEntity } from './entities/booking.entity';
import { BookingController } from './booking.controller';
import { InternalBookingController } from './internal-booking.controller';
import { BookingService } from './booking.service';
import { PaymentEventsConsumer } from './payment-events.consumer';
import { HoldExpiryJob } from './hold-expiry.job';
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
      database: process.env['DB_NAME'] ?? 'booking_db',
      entities: [BookingEntity, OutboxEntity],
      // TODO: switch to migrations before anything resembling production use
      synchronize: true,
      // TODO: bulkhead — cap this pool (extra: { max: N }); the Redis lock client
      // and the HTTP client calling Event Service each need their own bounded
      // pool/timeout too, so one slow dependency can't exhaust another's capacity
    }),
    TypeOrmModule.forFeature([BookingEntity, OutboxEntity]),
  ],
  controllers: [BookingController, InternalBookingController, HealthController],
  providers: [
    BookingService,
    PaymentEventsConsumer,
    HoldExpiryJob,
    JwtStrategy,
  ],
})
export class AppModule {}
