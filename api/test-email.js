import 'dotenv/config'; // Load environment variables from .env
import nodemailer from 'nodemailer';

const sendTestEmail = async () => {
  console.log('ZOHO_USER:', process.env.ZOHO_USER);
  console.log('ZOHO_PASS:', process.env.ZOHO_PASS ? 'Provided' : 'Not Provided');

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com', // Zoho SMTP host
    port: 465, // Secure port
    secure: true, // Use TLS
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  }, {
    logger: true, // Enable logging
    debug: true, // Enable debug output
  });

  const mailOptions = {
    from: `"Test Sender" <${process.env.ZOHO_USER}>`, // Sender address
    to: 'hello@annanizhoni.com', // Replace with your test email address
    subject: 'SMTP Test Email',
    text: 'This is a test email sent via nodemailer using Zoho SMTP.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info)); // Optional: Preview URL for testing
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

sendTestEmail();