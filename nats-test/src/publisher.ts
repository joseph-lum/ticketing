import nats from 'node-nats-streaming';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';
console.clear(); 

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
});  // Or client - stan is just community convention

stan.on('connect', async () => {
  console.log('Publisher conneted to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  await publisher.publish({
    id: '123',
    title: 'concert',
    price: 20,
    userId: '123'
  })

});