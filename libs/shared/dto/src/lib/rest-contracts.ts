/** Response contract for Event Service `GET /internal/ticket-tiers/:id`, consumed by Booking Service. */
export interface TicketTierView {
  id: string;
  eventId: string;
  name: string;
  price: number;
  version: number;
}

/** Revenue dashboard row exposed by Audit Service to Organizers. */
export interface OrganizerRevenueRow {
  eventId: string;
  eventName: string;
  ticketsSold: number;
  grossRevenue: number;
  refundedAmount: number;
  netRevenue: number;
}
