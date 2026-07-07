import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './schemas/notification-log.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(NotificationLog.name)
    private readonly logs: Model<NotificationLog>,
  ) {}

  // TODO: Nodemailer send, log result to Mongo regardless of success/failure
  async sendEmail(_recipient: string, _subject: string, _body: string) {
    throw new Error('not implemented');
  }
}
