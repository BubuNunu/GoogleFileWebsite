#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}=====================================================${NC}"
echo -e "${YELLOW}      Email Configuration Setup for Dami Air         ${NC}"
echo -e "${YELLOW}=====================================================${NC}"

ENV_FILE=".env.local"

# Check if file already exists
if [ -f "$ENV_FILE" ]; then
  echo -e "${YELLOW}A $ENV_FILE file already exists.${NC}"
  read -p "Overwrite it? (y/n): " OVERWRITE
  if [ "$OVERWRITE" != "y" ]; then
    echo -e "${RED}Setup cancelled.${NC}"
    exit 1
  fi
fi

# Email configuration options
echo -e "\n${GREEN}Choose your email provider:${NC}"
echo "1) Gmail (Recommended for testing)"
echo "2) Custom SMTP server"
read -p "Enter your choice (1-2): " EMAIL_CHOICE

# Create the .env.local file
echo "# Email Configuration - Created $(date)" > $ENV_FILE

if [ "$EMAIL_CHOICE" = "1" ]; then
  # Gmail configuration
  echo -e "\n${GREEN}Setting up Gmail configuration${NC}"
  read -p "Enter your Gmail address: " GMAIL_USER
  read -p "Enter your Gmail app password: " GMAIL_PASSWORD
  
  # Add Gmail configuration to .env file
  echo "# Gmail Configuration" >> $ENV_FILE
  echo "SMTP_HOST=smtp.gmail.com" >> $ENV_FILE
  echo "SMTP_PORT=465" >> $ENV_FILE
  echo "SMTP_USER=$GMAIL_USER" >> $ENV_FILE
  echo "SMTP_PASSWORD=$GMAIL_PASSWORD" >> $ENV_FILE
  echo "" >> $ENV_FILE
  echo "# Alternative format" >> $ENV_FILE
  echo "GMAIL_USER=$GMAIL_USER" >> $ENV_FILE
  echo "GMAIL_PASSWORD=$GMAIL_PASSWORD" >> $ENV_FILE
  
  echo -e "\n${GREEN}Gmail configuration saved to $ENV_FILE${NC}"
  echo -e "${YELLOW}NOTE: Make sure you've set up an App Password in your Google Account${NC}"
  echo -e "${YELLOW}      (requires 2-factor authentication to be enabled)${NC}"
  
elif [ "$EMAIL_CHOICE" = "2" ]; then
  # Custom SMTP configuration
  echo -e "\n${GREEN}Setting up custom SMTP configuration${NC}"
  read -p "Enter SMTP host (e.g., mail.yourdomain.com): " SMTP_HOST
  read -p "Enter SMTP port (e.g., 465 for SSL, 587 for TLS): " SMTP_PORT
  read -p "Enter SMTP username: " SMTP_USER
  read -p "Enter SMTP password: " SMTP_PASSWORD
  
  # Add SMTP configuration to .env file
  echo "# Custom SMTP Configuration" >> $ENV_FILE
  echo "SMTP_HOST=$SMTP_HOST" >> $ENV_FILE
  echo "SMTP_PORT=$SMTP_PORT" >> $ENV_FILE
  echo "SMTP_USER=$SMTP_USER" >> $ENV_FILE
  echo "SMTP_PASSWORD=$SMTP_PASSWORD" >> $ENV_FILE
  
  echo -e "\n${GREEN}SMTP configuration saved to $ENV_FILE${NC}"
else
  echo -e "${RED}Invalid choice. Please run the script again.${NC}"
  rm $ENV_FILE
  exit 1
fi

echo -e "\n${GREEN}Setup complete!${NC}"
echo -e "You can now run your server with: ${YELLOW}npm run server${NC}"
echo -e "${YELLOW}=====================================================${NC}" 