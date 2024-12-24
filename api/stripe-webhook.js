import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.ZOHO_USER, // Your Zoho email
        pass: process.env.ZOHO_PASS, // Your Zoho password
      },
    });

    const mailOptions = {
      from: `"Anna Nizhoni" <${process.env.ZOHO_USER}>`,
      to: session.customer_details.email, // Customer email from Stripe session
      subject: 'Thank you for your purchase!',
      text: `Hi ${session.customer_details.name},\n\nThank you for your purchase! Your payment of $${(
        session.amount_total / 100
      ).toFixed(2)} was successful.\n\nIf you have any questions, feel free to contact us.\n\nWarm Regards,\nAnna`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Confirmation email sent successfully');
    } catch (err) {
      console.error('Error sending confirmation email:', err.message);
    }
  }

  res.json({ received: true });
}