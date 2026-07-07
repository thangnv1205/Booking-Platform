import { OrganizerRevenueRow } from '@booking-platform/dto';

/** Backs the Organizer-facing revenue dashboard mentioned in the design doc's functional requirements. */
export class RevenueService {
  // TODO: Mongo aggregation pipeline over `audit_events` grouping by eventId:
  // ticketsSold from booking.confirmed, refundedAmount from refund.completed
  async forOrganizer(_organizerId: string): Promise<OrganizerRevenueRow[]> {
    throw new Error('not implemented');
  }
}
