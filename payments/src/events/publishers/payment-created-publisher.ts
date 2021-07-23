import { Subjects, Publisher, PaymentCreatedEvent } from '@jlyh/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}