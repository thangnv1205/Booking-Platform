import type { EntityManager } from 'typeorm';
import { EVENT_TYPES } from '@booking-platform/dto';
import { writeOutboxEvent } from './write-outbox-event';

describe('writeOutboxEvent', () => {
  it('inserts an envelope with the given topic, aggregateId, and eventType', async () => {
    const insert = jest.fn().mockResolvedValue(undefined);
    const manager = {
      getRepository: jest.fn().mockReturnValue({ insert }),
    } as unknown as EntityManager;

    await writeOutboxEvent(manager, {
      topic: 'booking-events',
      aggregateId: 'booking-1',
      eventType: EVENT_TYPES.BOOKING_HOLD,
      data: { bookingId: 'booking-1' },
    });

    expect(insert).toHaveBeenCalledTimes(1);
    const row = insert.mock.calls[0][0];
    expect(row.aggregateType).toBe('booking-events');
    expect(row.aggregateId).toBe('booking-1');
    expect(row.eventType).toBe(EVENT_TYPES.BOOKING_HOLD);
    expect(row.payload.data).toEqual({ bookingId: 'booking-1' });
    expect(row.payload.schemaVersion).toBe(1);
    expect(typeof row.payload.eventId).toBe('string');
  });
});
