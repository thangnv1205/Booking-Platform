import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationChannel = 'email' | 'sms' | 'push';
export type NotificationLogStatus = 'sent' | 'failed' | 'dead_letter';

@Schema({ timestamps: true })
export class NotificationLog extends Document {
  @Prop({ required: true })
  channel!: NotificationChannel;

  @Prop({ required: true })
  recipient!: string;

  @Prop()
  subject?: string;

  @Prop({ required: true })
  status!: NotificationLogStatus;

  @Prop()
  error?: string;

  /** Free-form per-channel payload (email has subject/body, push has device token, ...). */
  @Prop({ type: Object })
  meta?: Record<string, unknown>;
}

export const NotificationLogSchema =
  SchemaFactory.createForClass(NotificationLog);
