import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure dotenv to look for .env.local in the project root
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Verify required environment variables
const requiredEnvVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('\n❌ ERROR: Missing required environment variables:', missingEnvVars);
  console.error('Please update your .env.local file with actual values\n');
  process.exit(1); // Exit if environment variables are not properly set
}

// Check if environment variables still have placeholder values
if (process.env.SMTP_USER.includes('your-email') || 
    process.env.SMTP_PASSWORD.includes('your-app-specific-password')) {
  console.error('\n❌ ERROR: Please replace the placeholder values in .env.local with your actual Gmail credentials');
  console.error('Current values are still the default placeholders\n');
  process.exit(1);
}

// Configure nodemailer with more detailed options
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false // For testing purposes - remove in production
  }
});

// Verify SMTP connection on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('\n❌ SMTP connection error:', error);
    console.error('Please check your email credentials and settings\n');
    process.exit(1);
  } else {
    console.log('\n✅ SMTP server is ready to take messages');
  }
});

// Quote submission endpoint
app.post('/api/submit-quote', async (req, res) => {
  try {
    const { name, email, phone, serviceType, postcode, message } = req.body;

    console.log('Attempting to send email with data:', {
      name,
      email,
      phone,
      serviceType,
      postcode,
      messageLength: message ? message.length : 0
    });

    // Send email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'info@damiair.com.au',
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
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.status(200).json({ message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Detailed error when sending email:', {
      errorName: error.name,
      errorMessage: error.message,
      errorStack: error.stack
    });
    
    let errorMessage = 'Failed to submit quote request';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check SMTP credentials.';
    } else if (error.code === 'ESOCKET') {
      errorMessage = 'Failed to connect to email server. Please check SMTP settings.';
    }
    
    res.status(500).json({ 
      message: errorMessage,
      error: error.message 
    });
  }
});

app.listen(port, () => {
  console.log('\n=================================');
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log('=================================\n');
  console.log('Environment variables loaded:');
  console.log('- SMTP_HOST:', process.env.SMTP_HOST);
  console.log('- SMTP_PORT:', process.env.SMTP_PORT);
  console.log('- SMTP_USER:', process.env.SMTP_USER);
  console.log('- SMTP_PASSWORD:', '****');
  console.log('\n');
}); 