describe('RevenueService', () => {
  // TODO: aggregates ticketsSold from booking.confirmed events grouped by eventId
  it.todo('sums ticketsSold per event from booking.confirmed events');

  // TODO: subtracts refundedAmount (from refund.completed events) to get netRevenue
  it.todo('computes netRevenue as grossRevenue minus refundedAmount');

  // TODO: only returns rows for events owned by the given organizerId
  it.todo('scopes results to the requesting organizer');
});
