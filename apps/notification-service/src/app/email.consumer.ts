import { Injectable, OnModuleInit } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Injectable()
export class EmailConsumer implements OnModuleInit {
  constructor(private readonly notificationService: NotificationService) {}

  // TODO: amqplib consumer on the "email" queue bound to the "notifications" exchange;
  // retry with exponential backoff up to N attempts, then dead-letter to "email.dlq"
  async onModuleInit() {
    // not connected yet
  }
}
