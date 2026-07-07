describe('EventService', () => {
  // TODO: create() inserts event + tiers in one transaction — a failure on any tier
  // insert must roll back the event too, not leave a partial event with no tiers
  it.todo('create persists event and tiers atomically');

  // TODO: findAll()/findOne() read through Redis cache-aside; a cache miss falls back
  // to Postgres and repopulates the cache
  it.todo('findAll and findOne serve from cache after the first read');

  // TODO: create()/update() must invalidate the relevant cache-aside keys, otherwise
  // stale data (e.g. an already-sold-out tier) keeps being served
  it.todo('writes invalidate the cache-aside entries they affect');

  // TODO: findTierForBooking() is the internal endpoint Booking Service calls —
  // it must NOT be cached (price/availability has to be current)
  it.todo('findTierForBooking always reads current data, never cached');
});
