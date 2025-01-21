import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Log the request method and body for debugging
  console.log('Request received:', {
    method: req.method,
    body: req.body,
    headers: req.headers,
  });

  // Check if the method is POST
  if (req.method !== 'POST') {
    console.error('Invalid request method:', req.method);
    return res.status(405).json({ message: 'Method Not Allowed. Use POST.' });
  }

  const { name, email, message } = req.body;

  // Validate input fields
  if (!name || !email || !message) {
    console.error('Validation failed:', { name, email, message });
    return res.status(400).json({ message: 'All fields are required.' });
  }

  console.log('Request data validated:', { name, email, message });

  // Configure Nodemailer with Zoho Mail
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER, // Your Zoho email
      pass: process.env.ZOHO_PASS, // Your Zoho password or app password
    },
  });

  try {
    // Send email to your Zoho inbox
    const infoToSelf = await transporter.sendMail({
      from: `"Website Contact" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log('Email sent to Zoho inbox:', infoToSelf.messageId);

    // Send auto-reply to the user
    const infoToUser = await transporter.sendMail({
      from: `"Anna Nizhoni" <${process.env.ZOHO_USER}>`,
      to: email,
      subject: 'Thank You for Your Message!',
      text: `Hi ${name},\n\nThank you for reaching out! I’ve received your message: "${message}". I will get back to you within 24 hours.\n\nBest regards,\nAnna Nizhoni`,
    });

    console.log('Auto-reply email sent:', infoToUser.messageId);

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
}