/**
 * Integration test against real Postgres + Redis (Testcontainers), not mocks —
 * the whole point of this suite is proving the Redis lock + Postgres optimistic
 * `version` lock actually serialize concurrent writes, which a mocked repository
 * can't demonstrate.
 *
 * TODO once BookingService.createHold is implemented:
 * 1. beforeAll: start a PostgreSqlContainer + RedisContainer (@testcontainers/postgresql,
 *    @testcontainers/redis), run TypeORM synchronize against the container, seed a
 *    TicketTier row with a known small availableQuantity (e.g. 3)
 * 2. afterAll: stop both containers
 * 3. the oversell test: fire `availableQuantity + 5` concurrent createHold() calls via
 *    Promise.all, then assert: exactly `availableQuantity` bookings got created, the
 *    tier's availableQuantity is now 0, and the rest failed with a clear "sold out"
 *    error rather than corrupting the count
 * 4. the idempotency test: same Idempotency-Key twice concurrently -> one booking row
 */
describe.skip('BookingService (integration, Testcontainers)', () => {
  it.todo(
    'never oversells under real concurrent load against Postgres + Redis',
  );
  it.todo('idempotent createHold under concurrent duplicate requests');
});
