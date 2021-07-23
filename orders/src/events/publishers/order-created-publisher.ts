import { Publisher, OrderCreatedEvent, Subjects } from '@jlyh/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  
}