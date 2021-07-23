import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent, Subjects } from '@jlyh/common';

import { Listener } from '../../../common/src/events/base-listener';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data', data);
    
    msg.ack();
  }
}

