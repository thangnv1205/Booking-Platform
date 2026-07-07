export const KAFKA_TOPICS = {
  BOOKING_EVENTS: 'booking-events',
  PAYMENT_EVENTS: 'payment-events',
} as const;

export const EVENT_TYPES = {
  BOOKING_HOLD: 'booking.hold',
  BOOKING_CONFIRMED: 'booking.confirmed',
  BOOKING_RELEASED: 'booking.released',
  BOOKING_CANCELLED: 'booking.cancelled',
  PAYMENT_COMPLETED: 'payment.completed',
  PAYMENT_FAILED: 'payment.failed',
  REFUND_REQUESTED: 'refund.requested',
  REFUND_COMPLETED: 'refund.completed',
} as const;

export type EventType = (typeof EVENT_TYPES)[keyof typeof EVENT_TYPES];

/**
 * Envelope written verbatim into the outbox `payload` column.
 * Debezium's outbox EventRouter forwards this column as the Kafka record
 * value, so consumers get the full envelope without needing to read
 * Kafka record headers.
 */
export interface EventEnvelope<T = unknown> {
  schemaVersion: 1;
  eventId: string;
  eventType: EventType;
  occurredAt: string;
  data: T;
}

export interface BookingHoldData {
  bookingId: string;
  userId: string;
  eventId: string;
  tierId: string;
  quantity: number;
  totalAmount: number;
  idempotencyKey: string;
  holdExpiresAt: string;
}

export interface BookingConfirmedData {
  bookingId: string;
  userId: string;
  eventId: string;
  tierId: string;
  quantity: number;
  totalAmount: number;
}

export type BookingReleaseReason = 'EXPIRED' | 'PAYMENT_FAILED' | 'CANCELLED';

export interface BookingReleasedData {
  bookingId: string;
  tierId: string;
  quantity: number;
  reason: BookingReleaseReason;
}

export interface BookingCancelledData {
  bookingId: string;
  tierId: string;
  quantity: number;
}

export interface PaymentCompletedData {
  bookingId: string;
  paymentId: string;
  transactionRef: string;
  amount: number;
}

export interface PaymentFailedData {
  bookingId: string;
  paymentId: string;
  transactionRef: string;
  reason: string;
}

export interface RefundRequestedData {
  bookingId: string;
  paymentId: string;
  refundAmount: number;
  refundPercentage: number;
}

export interface RefundCompletedData {
  bookingId: string;
  paymentId: string;
  refundAmount: number;
}

export const IDEMPOTENCY_KEY_HEADER = 'idempotency-key';
