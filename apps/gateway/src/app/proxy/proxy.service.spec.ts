describe('ProxyService', () => {
  // TODO: forwards method/headers/body to the right downstream (DOWNSTREAM_TARGETS)
  it.todo('forwards the request to the target service unchanged');

  // TODO: opossum breaker opens after repeated failures and short-circuits to 503
  // instead of letting requests keep piling up against a downstream that's already down
  it.todo('returns 503 once the circuit breaker for a target is open');

  // TODO: one breaker per target — Booking Service being down must not open the
  // breaker for Event Service too
  it.todo('trips breakers independently per downstream target');
});
