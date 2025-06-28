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

// Verify if any mail config is available
const smtpConfigAvailable = process.env.SMTP_HOST && 
                            process.env.SMTP_PORT && 
                            process.env.SMTP_USER && 
                            process.env.SMTP_PASSWORD;

const gmailConfigAvailable = process.env.GMAIL_USER && 
                             process.env.GMAIL_PASSWORD;

console.log('\n=================================');
console.log(`✅ Server running at http://localhost:${port}`);
console.log('=================================\n');

// Try to set up email transport based on available config
let transporter;
let emailConfigValid = false;
let configMessage = '';

// Try SMTP Configuration first
if (smtpConfigAvailable) {
  try {
    console.log('Attempting to use SMTP configuration:');
    console.log('- SMTP_HOST:', process.env.SMTP_HOST);
    console.log('- SMTP_PORT:', process.env.SMTP_PORT);
    console.log('- SMTP_USER:', process.env.SMTP_USER);
    console.log('- SMTP_PASSWORD:', '****');

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false // Only for testing - remove in production
      }
    });
    
    // Will be set to true if verification succeeds
    emailConfigValid = false;
    configMessage = 'Using SMTP configuration';
  } catch (error) {
    console.error('Error setting up SMTP transport:', error);
  }
} 

// Try Gmail as fallback
if (!emailConfigValid && gmailConfigAvailable) {
  try {
    console.log('\nAttempting to use Gmail configuration:');
    console.log('- GMAIL_USER:', process.env.GMAIL_USER);
    console.log('- GMAIL_PASSWORD:', '****');

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      }
    });
    
    // Will be set to true if verification succeeds
    emailConfigValid = false;
    configMessage = 'Using Gmail configuration';
  } catch (error) {
    console.error('Error setting up Gmail transport:', error);
  }
}

// If no valid configuration, provide instructions
if (!transporter) {
  console.error('\n❌ No valid email configuration found');
  console.log('\n==========================================================');
  console.log('IMPORTANT: To fix this issue, create a .env.local file with:');
  console.log('==========================================================');
  console.log('Option 1 - SMTP Configuration:');
  console.log('SMTP_HOST=smtp.gmail.com');
  console.log('SMTP_PORT=465');
  console.log('SMTP_USER=your-email@gmail.com');
  console.log('SMTP_PASSWORD=your-app-password');
  console.log('\nOR\n');
  console.log('Option 2 - Gmail Configuration:');
  console.log('GMAIL_USER=your-email@gmail.com');
  console.log('GMAIL_PASSWORD=your-app-password');
  console.log('==========================================================');
  console.log('For Gmail, you must use an App Password (requires 2FA)');
  console.log('==========================================================\n');
  
  // Create emergency transporter for logging only
  transporter = {
    sendMail: (mailOptions) => {
      console.log('EMAIL WOULD BE SENT (but no valid config):');
      console.log(mailOptions);
      return Promise.resolve({ messageId: 'dummy-id' });
    },
    verify: (callback) => {
      callback(null, false);
    }
  };
} else {
  // Verify SMTP connection
  transporter.verify(function(error, success) {
    if (error) {
      console.error('\n❌ Email connection error:', error);
      console.error('Please check your email credentials and settings\n');
      
      // Log helpful instructions
      console.log('\n==========================================================');
      console.log('RECOMMENDATION: Try Gmail SMTP as a fallback');
      console.log('==========================================================');
      console.log('Update your .env.local file with:');
      console.log('SMTP_HOST=smtp.gmail.com');
      console.log('SMTP_PORT=465');
      console.log('SMTP_USER=your-gmail@gmail.com');
      console.log('SMTP_PASSWORD=your-app-password');
      console.log('==========================================================');
      console.log('For Gmail, you must use an App Password (requires 2FA)');
      console.log('==========================================================\n');
      
      emailConfigValid = false;
    } else {
      console.log('\n✅ Email server is connected and ready');
      emailConfigValid = true;
    }
  });
}

// Quote submission endpoint
app.post('/api/submit-quote', async (req, res) => {
  try {
    const { name, email, phone, serviceType, postcode, message } = req.body;

    console.log('Received quote submission from:', email);
    
    if (!emailConfigValid) {
      console.log('⚠️ Email config invalid - logging submission only:');
      console.log({ name, email, phone, serviceType, postcode, messageLength: message?.length || 0 });
      
      // Return success for testing, but log warning
      console.log('⚠️ WARNING: No email sent - returning mock success response');
      return res.status(200).json({ 
        message: 'Quote logged (email not sent - configuration issue)',
        configStatus: 'invalid'
      });
    }

    // Format service type for display
    const serviceTypeDisplay = serviceType.includes('featuredServices.') 
      ? serviceType.replace('featuredServices.', '') 
      : serviceType;

    // Send email
    const mailOptions = {
      from: process.env.SMTP_USER || process.env.GMAIL_USER,
      to: 'info@damiair.com.au',
      replyTo: email,
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
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Quote email sent successfully:', info.messageId);

    // Send confirmation email to customer
    const confirmationOptions = {
      from: process.env.SMTP_USER || process.env.GMAIL_USER,
      to: email,
      subject: "We've Received Your Request – DAMI AIR PTY LTD",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Hi ${name.split(' ')[0]},</h2>
          
          <p>Thanks for reaching out to <strong>DAMI AIR PTY LTD</strong>!</p>
          
          <p>We've received your enquiry, and one of our team members will review the details and get back to you soon. If your request is urgent, feel free to contact us directly at <strong>045 228 7883</strong>.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Request Summary:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Service Type:</strong> ${serviceTypeDisplay}</p>
            <p><strong>Property Postcode:</strong> ${postcode || 'Not provided'}</p>
            <p><strong>Additional Notes:</strong> ${message || 'No additional notes provided'}</p>
          </div>
          
          <p>We look forward to helping you with your air conditioning and HVAC needs — whether it's a new installation, energy upgrade, or a quick repair.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
            <p style="margin-bottom: 5px;"><strong>Kind regards,</strong></p>
            <p style="margin-bottom: 5px;"><strong>The DAMI AIR Team</strong></p>
            <p style="margin-bottom: 5px; color: #666;">Heating and Cooling Experts</p>
            <p style="margin-bottom: 5px;">📞 0451028668</p>
            <p style="margin-bottom: 5px;">✉️ info@damiair.com.au</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <img src="https://damiair.com.au/wp-content/uploads/2024/01/FullLogo_Transparent_NoBuffer_NoSlogan.png" 
                 alt="DAMI AIR Logo" 
                 style="max-width: 200px; height: auto;">
          </div>
        </div>
      `,
    };

    try {
      await transporter.sendMail(confirmationOptions);
      console.log('✅ Confirmation email sent to customer:', email);
    } catch (error) {
      console.error('⚠️ Unable to send confirmation email to customer:', error);
      // Continue with success response even if confirmation fails
    }

    res.status(200).json({ 
      message: 'Quote request submitted successfully',
      configStatus: 'valid'
    });
  } catch (error) {
    console.error('Error processing quote request:', {
      errorName: error.name,
      errorMessage: error.message,
      stack: error.stack
    });
    
    let errorMessage = 'Failed to submit quote request';
    if (error.code === 'EAUTH') {
      errorMessage = 'Email authentication failed. Please check SMTP credentials.';
    } else if (error.code === 'ESOCKET' || error.code === 'EDNS') {
      errorMessage = 'Failed to connect to email server. Please check SMTP settings.';
    }
    
    res.status(500).json({ 
      message: errorMessage,
      error: error.message,
      configStatus: emailConfigValid ? 'valid' : 'invalid'
    });
  }
});

app.listen(port, () => {
  // Server info already logged above
}); 