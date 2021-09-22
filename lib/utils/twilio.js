const twilio = require("twilio");

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

async function sendSms(to, message) {
  await twilioClient.messages.create({
    body: message,
    from: process.env.TWILIO_NUMBER,
    to,
  });
}

module.exports = { sendSms };
