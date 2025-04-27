import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Configure nodemailer with your email service credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const TARGET_EMAIL = 'info@damiair.com.au'; // The email address where quotes will be sent

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, serviceType, postcode, message } = req.body;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: TARGET_EMAIL,
      subject: 'New Quote Request',
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Type:</strong> ${serviceType}</p>
        <p><strong>Postcode:</strong> ${postcode}</p>
        <p><strong>Message:</strong> ${message || 'No additional message provided.'}</p>
      `,
    });

    res.status(200).json({ message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to submit quote request' });
  }
} 