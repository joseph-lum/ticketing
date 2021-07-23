import { Publisher, OrderCancelledEvent, Subjects } from '@jlyh/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}