describe('NotificationService', () => {
  // TODO: successful send -> log entry status 'sent' in Mongo
  it.todo('logs a sent notification');

  // TODO: failed send (SMTP error) -> log entry status 'failed' with the error message,
  // caller (EmailConsumer) decides retry vs DLQ — this method itself must not throw
  // in a way that loses the failure reason
  it.todo('logs a failed notification with its error');
});
