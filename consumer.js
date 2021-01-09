import { connect as _connect } from "amqplib";

connect();

async function connect() {
  try {
    // TCP connection
    const connection = await _connect("amqp://localhost:5672");
    // There can me multiple channels inside a connection
    const channel = await connection.createChannel();
    // Checks if queue exits, if it doesn't exist it creates one
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (message) => {
      const content = JSON.parse(message.content.toString());
      console.log("content received", content);
      if (content.number == 7) {
        channel.ack(message);
      }
    });

    console.log("Waiting for messages");
  } catch (e) {
    console.error(e);
  }
}
