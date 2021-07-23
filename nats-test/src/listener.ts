import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
}); // Or client - stan is just community convention

stan.on("connect", () => {
  console.log("Listener connected to NATS");

  stan.on("close", () => {
    console.log("NATS Connection closed");
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

// Doesn't work for Windows
process.on("SIGNINT", () => stan.close());
process.on("SIGTERM", () => stan.close());

