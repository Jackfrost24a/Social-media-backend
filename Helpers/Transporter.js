const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS_EMAIL, // Key Generate
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
