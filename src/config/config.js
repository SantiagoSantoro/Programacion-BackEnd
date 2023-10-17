import dotenv from 'dotenv'

dotenv.config();

export const config = {
  databaseUrl: process.env.DATABASE_URL,
  secretKey: process.env.SECRET_KEY,
  apiKey: process.env.API_KEY,
};


