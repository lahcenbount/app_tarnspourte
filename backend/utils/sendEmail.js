const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  // Config SMTP via .env
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"No Reply" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;

