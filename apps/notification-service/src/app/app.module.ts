import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NotificationLog,
  NotificationLogSchema,
} from './schemas/notification-log.schema';
import { NotificationService } from './notification.service';
import { KafkaBridgeConsumer } from './kafka-bridge.consumer';
import { EmailConsumer } from './email.consumer';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env['MONGO_URL'] ?? 'mongodb://localhost:27027/notification_db',
    ),
    MongooseModule.forFeature([
      { name: NotificationLog.name, schema: NotificationLogSchema },
    ]),
  ],
  controllers: [HealthController],
  providers: [NotificationService, KafkaBridgeConsumer, EmailConsumer],
})
export class AppModule {}
