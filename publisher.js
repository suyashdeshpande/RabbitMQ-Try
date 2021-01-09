import { connect as _connect } from "amqplib";

const message = {
  // Take value from command line input
  number: process.argv[2]
};

connect();

async function connect() {
  try {
    // TCP connection
    const connection = await _connect("amqp://localhost:5672");
    // There can me multiple channels inside a connection
    const channel = await connection.createChannel();
    // Checks if queue exits, if it doesn't exist it creates one
    const result = await channel.assertQueue("jobs");
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)));
    console.log("job sent successfully", message);
  } catch (e) {
    console.error(e);
  }
}
