import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { TicketUpdatedEvent } from '@jlyh/common';
import { TicketUpdatedListener  } from "../ticket-updated-listener";
import { natsWrapper } from "../../../nats-wrapper";
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // create an instance of listener
  const listener = new TicketUpdatedListener(natsWrapper.client);

  // create and save a ticket 
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  });
  await ticket.save();

  // create a fake data event
  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 999,
    userId: new mongoose.Types.ObjectId().toHexString()
  }

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn() 
  }

  return { listener, data, msg, ticket }
};

it("finds, updates, and saves a ticket", async () => {
  const { listener, data, msg, ticket } = await setup();
  
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  
  // write assertions to make sure a ticket was created
  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket).toBeDefined();
  expect(updatedTicket!.title).toEqual(data.title);
  expect(updatedTicket!.price).toEqual(data.price);
  expect(updatedTicket!.version).toEqual(data.version);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);
  
  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});

it('does not call ack if event has a skipped version', async () => {
  const { listener, data, msg, ticket } = await setup();
  
  data.version = 10;

  // call the onMessage function with the data object + message object
  try {
    await listener.onMessage(data, msg);
  } catch(e){
  }
  
  expect(msg.ack).not.toHaveBeenCalled();
})