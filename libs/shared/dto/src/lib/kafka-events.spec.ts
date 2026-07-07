import { EVENT_TYPES, KAFKA_TOPICS } from './kafka-events';

describe('kafka-events contracts', () => {
  it('gives every topic a unique name', () => {
    const names = Object.values(KAFKA_TOPICS);
    expect(new Set(names).size).toBe(names.length);
  });

  it('gives every event type a unique name', () => {
    const names = Object.values(EVENT_TYPES);
    expect(new Set(names).size).toBe(names.length);
  });
});
