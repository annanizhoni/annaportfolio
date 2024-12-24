import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.ZOHO_USER}>`,
      to: process.env.ZOHO_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    await transporter.sendMail({
      from: '"Anna Nizhoni" <' + process.env.ZOHO_USER + '>',
      to: email,
      subject: "Hello",
      text: `Hi ${name},\n\nThank you for reaching out! I’ve received your message: "${message}". I will get back to you within 24 hours.`,
    });    

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
}