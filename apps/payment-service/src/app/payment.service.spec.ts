describe('PaymentService', () => {
  describe('checkout', () => {
    // TODO: dedup on transactionRef — a retried checkout call (client timeout, webhook
    // replay) must not charge twice
    it.todo('is idempotent on a repeated transactionRef');

    // TODO: successful mock gateway call -> Payment row COMPLETED, outbox payment.completed
    it.todo(
      'records a completed payment and emits payment.completed on success',
    );

    // TODO: failed mock gateway call -> Payment row FAILED, outbox payment.failed
    // (this is what Booking Service's PaymentEventsConsumer relies on to release the seat)
    it.todo('records a failed payment and emits payment.failed on failure');
  });

  describe('processRefund', () => {
    // TODO: triggered by consuming refund.requested — mock gateway refund call,
    // update Payment row, outbox refund.completed
    it.todo('processes a refund and emits refund.completed');
  });
});
