import dotenv from 'dotenv'

dotenv.config();

export const config = {
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  secretKey: process.env.SECRET_KEY,
  apiKey: process.env.API_KEY,
  mailingService: process.env.MAILING_SERVICE, 
  mailingUser: process.env.MAILING_USER,
  mailingPassword: process.env.MAILING_PASSWORD,
};


