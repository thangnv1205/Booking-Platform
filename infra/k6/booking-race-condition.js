/**
 * Load test for the anti-overselling guarantee: every VU fires one booking
 * request at essentially the same instant against a single ticket tier that
 * has fewer tickets available than there are VUs, then the summary reports
 * how many succeeded — that number must equal the tier's starting
 * availableQuantity, never more.
 *
 * k6 can't check Postgres itself, so this only proves half the property (no
 * HTTP-visible oversell); cross-check the DB afterwards:
 *   SELECT available_quantity, version FROM ticket_tiers WHERE id = '<TIER_ID>';
 *   SELECT count(*) FROM bookings WHERE tier_id = '<TIER_ID>' AND status != 'EXPIRED';
 * and confirm bookings sold + available_quantity == totalQuantity.
 *
 * Setup before running (all still TODO until the corresponding services work):
 *   1. register + login an ORGANIZER, create an event with a tier of a small known
 *      quantity (e.g. 20) via POST /events
 *   2. register + login a USER, grab its access token
 *   3. run:
 *      BASE_URL=http://localhost:4000 ACCESS_TOKEN=... TIER_ID=... EVENT_ID=... \
 *      TIER_QUANTITY=20 VUS=50 k6 run infra/k6/booking-race-condition.js
 */
import http from 'k6/http';
import { check } from 'k6';
import { Counter } from 'k6/metrics';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:4000';
const ACCESS_TOKEN = __ENV.ACCESS_TOKEN || '';
const EVENT_ID = __ENV.EVENT_ID || '';
const TIER_ID = __ENV.TIER_ID || '';
const VUS = Number(__ENV.VUS || 50);

const successes = new Counter('booking_successes');
const soldOut = new Counter('booking_sold_out');
const unexpectedErrors = new Counter('booking_unexpected_errors');

export const options = {
  scenarios: {
    race: {
      executor: 'per-vu-iterations',
      vus: VUS,
      iterations: 1,
      maxDuration: '30s',
    },
  },
  thresholds: {
    // the real assertion is the printed summary vs TIER_QUANTITY — this threshold
    // just catches "everything 500'd", not "we oversold by exactly one"
    booking_unexpected_errors: ['count==0'],
  },
};

export default function bookOneTicket() {
  const res = http.post(
    `${BASE_URL}/bookings`,
    JSON.stringify({ eventId: EVENT_ID, tierId: TIER_ID, quantity: 1 }),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Idempotency-Key': `k6-${__VU}-${__ITER}`,
      },
    },
  );

  if (res.status === 201) {
    successes.add(1);
  } else if (res.status === 409 || res.status === 400) {
    soldOut.add(1);
  } else {
    unexpectedErrors.add(1);
  }

  check(res, {
    'status is 201 or a sold-out rejection (409/400)': (r) =>
      r.status === 201 || r.status === 409 || r.status === 400,
  });
}
