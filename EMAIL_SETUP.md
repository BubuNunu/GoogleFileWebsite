# Email Setup for Quote Form

The quote form is configured to send emails to info@damiair.com.au when users submit a request.

## Configuration

To enable email functionality, you need to set up the following environment variables:

1. Create a `.env.local` file in the root directory of the project with the following variables:

```
# Email Configuration
SMTP_HOST=your-smtp-server.com
SMTP_PORT=465
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-email-password
```

### Using Gmail (Recommended for testing)

If you're using Gmail as your email provider:

1. Set up an app password in your Google account (2FA must be enabled)
   - Go to your Google Account → Security
   - Under "Signing in to Google" select "App passwords"
   - Generate a new app password for "Mail" and "Other (Custom name)"

2. Configure your `.env.local` file:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-gmail@gmail.com
SMTP_PASSWORD=your-app-password
```

Or alternatively, use these variables directly:

```
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASS=your-app-password
```

## Vercel Deployment

If deploying to Vercel, add these environment variables in the Vercel dashboard:

1. Go to your project in Vercel
2. Navigate to Settings → Environment Variables
3. Add each of the email configuration variables

## Testing

To test the email functionality:
1. Fill out the quote form on the website
2. Submit the form
3. Check the target email inbox for the received quote
4. The customer should also receive a confirmation email

## Troubleshooting

- If emails are not being sent, check the server logs for error messages
- Verify that your SMTP credentials are correct
- Make sure your email provider allows sending from your application
- For Gmail, ensure you're using an app password, not your regular password 