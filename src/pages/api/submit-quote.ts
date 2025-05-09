import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Target email where quote requests will be sent
const TARGET_EMAIL = 'info@damiair.com.au';

// Configure nodemailer with email service credentials
const getTransporter = () => {
  // Check if environment variables are set
  if (
    process.env.SMTP_HOST && 
    process.env.SMTP_PORT && 
    process.env.SMTP_USER && 
    process.env.SMTP_PASSWORD
  ) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  
  // Fallback to a service like Gmail
  // Note: For production, you should set up environment variables
  console.warn('Email config not found in environment variables, using fallback config');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER || 'your-backup-email@gmail.com', // Replace with actual backup email
      pass: process.env.GMAIL_PASS || 'your-app-password', // Replace with actual app password
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, serviceType, postcode, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !serviceType || !postcode) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transporter = getTransporter();
    
    // Translate service type if needed
    const serviceTypeDisplay = serviceType.includes('featuredServices.') 
      ? serviceType.replace('featuredServices.', '') 
      : serviceType;

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER || process.env.GMAIL_USER || 'your-website@example.com',
      to: TARGET_EMAIL,
      subject: `New Quote Request - ${serviceTypeDisplay}`,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service Type:</strong> ${serviceTypeDisplay}</p>
        <p><strong>Postcode:</strong> ${postcode}</p>
        <p><strong>Message:</strong> ${message || 'No additional message provided.'}</p>
      `,
      // Add reply-to so the business can reply directly to the customer
      replyTo: email,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.SMTP_USER || process.env.GMAIL_USER || 'info@damiair.com.au',
      to: email,
      subject: 'Your Quote Request - Dami Air',
      html: `
        <h2>Thank you for your quote request!</h2>
        <p>Dear ${name},</p>
        <p>We have received your quote request for ${serviceTypeDisplay} services.</p>
        <p>Our team will review your request and get back to you shortly.</p>
        <p>If you have any urgent questions, please contact us at ${TARGET_EMAIL} or by phone.</p>
        <p>Best regards,<br>Dami Air Team</p>
      `,
    });

    res.status(200).json({ message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to submit quote request' });
  }
} 