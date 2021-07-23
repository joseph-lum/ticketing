import { Publisher, Subjects, TicketUpdatedEvent } from "@jlyh/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  
}