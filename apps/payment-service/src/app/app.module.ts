import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '@booking-platform/auth';
import { OutboxEntity } from '@booking-platform/outbox';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { BookingEventsConsumer } from './booking-events.consumer';
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
      database: process.env['DB_NAME'] ?? 'payment_db',
      entities: [PaymentEntity, OutboxEntity],
      // TODO: switch to migrations before anything resembling production use
      synchronize: true,
      // TODO: bulkhead — cap this pool (extra: { max: N }); the HTTP client calling
      // Booking Service (checkout) and the mock payment gateway client each need
      // their own bounded pool/timeout too
    }),
    TypeOrmModule.forFeature([PaymentEntity, OutboxEntity]),
  ],
  controllers: [PaymentController, HealthController],
  providers: [PaymentService, BookingEventsConsumer, JwtStrategy],
})
export class AppModule {}
