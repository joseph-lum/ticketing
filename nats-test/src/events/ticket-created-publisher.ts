import { Publisher, TicketCreatedEvent, Subjects } from '@jlyh/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;

}
