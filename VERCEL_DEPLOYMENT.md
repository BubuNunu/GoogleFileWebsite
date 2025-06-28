# Vercel Deployment Guide

Your backend has been configured for Vercel deployment. Follow these steps to deploy:

## Step 1: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up/login with your GitHub account
2. **Click "New Project"**
3. **Import your GitHub repository**: `BubuNunu/GoogleFileWebsite`
4. **Configure the project**:
   - Framework Preset: `Vite`
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build` (should be auto-detected)
   - Output Directory: `dist` (should be auto-detected)
   - Install Command: `npm install` (should be auto-detected)

5. **Click "Deploy"**

## Step 2: Configure Environment Variables

After deployment, you need to add your email configuration:

1. **Go to your project dashboard on Vercel**
2. **Navigate to Settings → Environment Variables**
3. **Add the following variables**:

### Option 1: Gmail Configuration (Recommended)
```
GMAIL_USER=your-gmail@gmail.com
GMAIL_PASSWORD=your-app-password
```

### Option 2: SMTP Configuration
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Important**: For Gmail, you must use an App Password (not your regular password) and have 2FA enabled.

## Step 3: Update Your Frontend

Once deployed, you'll get a URL like: `https://your-project.vercel.app`

Update your frontend code in `src/components/QuoteDialog.tsx`:

```typescript
const apiUrl = process.env.NODE_ENV === 'production' 
  ? 'https://your-project.vercel.app/api/submit-quote'  // Replace with your actual Vercel URL
  : 'http://localhost:3000/api/submit-quote';
```

## Step 4: Test the Deployment

1. **Visit your deployed site**
2. **Try submitting a quote form**
3. **Check the Vercel function logs** in your dashboard to see if emails are being sent

## Troubleshooting

### If emails aren't sending:
1. Check the Vercel function logs in your dashboard
2. Verify your environment variables are set correctly
3. Make sure your Gmail app password is correct

### If you get CORS errors:
The API is already configured with CORS, but if you still get errors, check that your frontend URL is correct.

## What's Been Set Up

✅ **API Route**: `/api/submit-quote.js` - Handles quote form submissions
✅ **Vercel Configuration**: `vercel.json` - Routes API calls to serverless functions
✅ **CORS Support**: Configured to allow requests from any origin
✅ **Email Configuration**: Supports both Gmail and SMTP

## Next Steps

1. Deploy to Vercel using the web interface
2. Add your email environment variables
3. Update your frontend with the new API URL
4. Test the quote form functionality

Your backend will be fully functional once deployed! 