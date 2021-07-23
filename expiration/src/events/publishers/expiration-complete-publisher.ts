import { Subjects, Publisher, ExpirationCompleteEvent } from '@jlyh/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}