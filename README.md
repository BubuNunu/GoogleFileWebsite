# DAMI AIR - Modern HVAC Solutions Website

A modern, responsive website for DAMI AIR HVAC services built with React, TypeScript, and Express.js. Features multi-language support, interactive quote system, and seamless email integration.

![DAMI AIR Logo](public/dami-air-logo.png)

## 🚀 Features

- **Modern React Frontend**: Built with Vite.js and TypeScript for optimal performance
- **Responsive Design**: Mobile-first approach with Material-UI components
- **Multi-language Support**: English and Chinese language switching
- **Interactive Quote System**: Real-time quote requests with email notifications
- **Brand Showcase**: Display of major HVAC brands and services
- **Professional Gallery**: Project portfolios and testimonials
- **Contact Integration**: Direct email functionality through backend API

## 🛠️ Tech Stack

### Frontend
- **Vite.js** - Build tool and development server
- **React 18** - UI framework
- **TypeScript** - Type safety and better developer experience
- **Material-UI (MUI)** - Component library and design system
- **React Router** - Client-side routing
- **i18next** - Internationalization framework

### Backend
- **Express.js** - Node.js web framework
- **Nodemailer** - Email sending functionality
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Deployment & CI/CD
- **Vercel** - Hosting platform with serverless functions
- **GitHub Actions** - Automated deployment pipeline
- **ESLint** - Code linting and formatting

## 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **Gmail Account** with App Password (for email functionality)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dami-air-website.git
cd dami-air-website/GoogleFileWebsite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the project root:

```bash
# Email Configuration (choose one option)

# Option 1: Gmail (Recommended)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password

# Option 2: SMTP Server
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

**Note**: For Gmail, you need to:
1. Enable 2-Factor Authentication
2. Generate an App Password in your Google Account settings
3. Use the App Password (not your regular password)

### 4. Start Development Servers

**Frontend Development Server:**
```bash
npm run dev
```
Visit: `http://localhost:5173`

**Backend API Server (in a new terminal):**
```bash
npm run server
```
API available at: `http://localhost:3000`

## 🏗️ Project Structure

```
GoogleFileWebsite/
├── api/                      # Vercel serverless functions
│   └── submit-quote.js       # Quote submission API
├── public/                   # Static assets
│   ├── dami-air-logo.png    # Company logos
│   └── vite.svg             # Vite logo
├── server/                   # Express.js backend
│   └── index.js             # Main server file
├── src/
│   ├── components/          # React components
│   │   ├── pages/           # Page components
│   │   ├── QuoteDialog.tsx  # Quote form modal
│   │   └── LanguageSwitcher.tsx
│   ├── i18n/               # Internationalization
│   │   ├── i18n.ts         # i18n configuration
│   │   └── locales/        # Translation files
│   ├── assets/             # Images and media
│   ├── App.tsx             # Main App component
│   └── main.tsx            # App entry point
├── package.json            # Dependencies and scripts
├── vite.config.ts         # Vite configuration
├── vercel.json            # Vercel deployment config
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Deployment

### Deploying to Vercel

#### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

#### Method 2: GitHub Integration

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings:
     - Framework: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Root Directory: `./`

3. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add your email configuration variables

### CI/CD Pipeline

The project automatically deploys to Vercel when you push to the `main` branch. The deployment process:

1. **Build Process**: Vite builds the React app for production
2. **Serverless Functions**: Express API routes are converted to Vercel functions
3. **Static Assets**: Built files are served from Vercel's CDN
4. **Environment Variables**: Secure handling of email credentials

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start Vite development server
npm run server       # Start Express backend server

# Building
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically

# Deployment
npm run deploy       # Deploy to GitHub Pages (legacy)
```

## 🔧 Configuration

### Vite Configuration

Key configurations in `vite.config.ts`:
- **Proxy Setup**: API requests to backend during development
- **Path Aliases**: `@` alias for `src` directory
- **React Plugin**: Hot module replacement and fast refresh

### TypeScript Configuration

- **Strict Mode**: Enabled for better type safety
- **Path Mapping**: Configured for clean imports
- **Build Optimization**: Configured for production builds

### Email Configuration

The backend supports multiple email providers:
- **Gmail**: Using App Passwords (recommended)
- **SMTP**: Any SMTP-compatible email service
- **Environment Variables**: Secure credential management

## 🐛 Troubleshooting

### Common Issues

**1. Email not sending:**
- Verify your Gmail App Password is correct
- Check that 2FA is enabled on your Google account
- Ensure environment variables are set correctly

**2. Build errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. TypeScript errors:**
```bash
# Check TypeScript compilation
npx tsc --noEmit
```

**4. Vite development server issues:**
```bash
# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Environment Variable Issues

Make sure your `.env.local` file is in the project root and follows this format:
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-character-app-password
```

### API Connection Issues

If the frontend can't connect to the backend:
1. Check that both servers are running
2. Verify the proxy configuration in `vite.config.ts`
3. Ensure CORS is properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is private and proprietary to DAMI AIR.

## 📞 Support

For technical support or questions about DAMI AIR services:
- **Website**: [Your deployed Vercel URL]
- **Email**: Contact through the website form
- **Developer**: [Your contact information]

---

**Built with ❤️ for DAMI AIR - Professional HVAC Solutions**
