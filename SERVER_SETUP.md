# Server Setup for Email Functionality

The quote form requires a running server to handle email sending. Follow these steps to set up and run the server:

## Setup Instructions (Option 1 - Using Setup Script)

1. **Run the setup script** from the project root:
   ```
   ./setup-env.sh
   ```

2. Follow the prompts to configure your email settings. You'll have two options:
   - Gmail (recommended for testing)
   - Custom SMTP server

   For Gmail, you'll need to set up an App Password (requires 2FA).

## Setup Instructions (Option 2 - Manual Configuration)

1. **Create a `.env.local` file** in the project root with the following content:
   ```
   # SMTP Configuration
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   ```
   
   Note: Replace the placeholder values with your actual email credentials.

2. **For Gmail users**:
   - Use an App Password instead of your regular password
   - Enable 2FA on your Google account
   - Generate an App Password from your Google Account settings

## Running the Server

To start the development environment correctly:

1. **Start the Express server** in one terminal:
   ```
   npm run server
   ```
   
   You should see output confirming:
   - Server is running on port 3000
   - Email configuration status
   - Connection to the email server (if successful)

2. **Start the Vite development server** in another terminal:
   ```
   npm run dev
   ```

3. **Both servers must be running** for the quote form to work properly in development.

## Important Notes

- The server has been improved to handle configuration issues without crashing
- If email configuration is invalid, the server will still run and log form submissions
- For testing purposes, form submissions will show as successful even without valid email config
- Check the server logs to see if emails are actually being sent

## Troubleshooting

If you encounter email sending issues:

1. **DNS Error (mail.damiair.com.au)**:
   - The mail server hostname might be incorrect
   - Try using Gmail SMTP for reliable testing

2. **Authentication Error**:
   - Verify your email credentials are correct
   - For Gmail, ensure you're using an App Password, not your regular password
   - 2FA must be enabled for Gmail App Passwords

3. **Connection Issues**:
   - Check your firewall settings
   - Verify the SMTP port is correct (465 for SSL, 587 for TLS)

## Production Setup

For production deployment:

1. Deploy the Express server separately or combine it with your frontend build
2. Set the environment variables on your hosting platform
3. In `QuoteDialog.tsx`, the code automatically switches to use the correct API URL in production 