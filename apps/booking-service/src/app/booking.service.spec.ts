describe('BookingService', () => {
  describe('createHold', () => {
    // TODO: the load-bearing test of the whole project — fire N concurrent createHold()
    // calls against a tier with fewer than N tickets available and assert the number of
    // bookings actually created equals the starting availableQuantity, never more.
    // Use Testcontainers Postgres+Redis here, not mocks — the whole point is proving the
    // Redis lock + optimistic `version` lock actually serialize the decrement.
    it.todo('never oversells under concurrent requests for the same tier');

    // TODO: same idempotencyKey submitted twice (client retry) must return the SAME
    // booking, not create a second one
    it.todo('is idempotent on a repeated Idempotency-Key');

    // TODO: optimistic lock version mismatch (concurrent writer won the race) should
    // retry the transaction a bounded number of times, not surface a 500 to the caller
    it.todo(
      'retries on optimistic-lock version conflict instead of failing the request',
    );

    // TODO: if the Event Service REST call (tier lookup) fails, the booking must not be
    // created and the Redis lock must still be released (no leaked lock)
    it.todo(
      'releases the Redis lock even when the downstream Event Service call fails',
    );
  });

  describe('release / confirmFromPayment (saga compensation)', () => {
    // TODO: consuming payment.completed must flip HOLDING -> CONFIRMED and emit
    // booking.confirmed via outbox
    it.todo('confirms the booking and restores nothing on payment.completed');

    // TODO: consuming payment.failed must flip HOLDING -> RELEASED AND restore
    // availableQuantity on the tier — this is the compensation step the original
    // design doc was missing
    it.todo('releases held quantity back to the tier on payment.failed');
  });

  describe('expireStaleHolds', () => {
    // TODO: HOLDING bookings past holdExpiresAt get EXPIRED + quantity restored;
    // bookings not yet expired must be left untouched
    it.todo('expires only bookings past their hold deadline');
  });
});
