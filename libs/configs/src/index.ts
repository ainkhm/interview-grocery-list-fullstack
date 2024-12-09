import * as dotenv from 'dotenv';
import { validationOptions } from './validation.config';

dotenv.config();

const PORT: number = parseInt(process.env['PORT'] || '5000', 10);

let POSTGRES_URI: string;
let JWT_SECRET: string;

if (process.env['NODE_ENV'] === 'development') {
  POSTGRES_URI = 'postgres://admin:password1@localhost:5432/goji_interview';
  JWT_SECRET = 'JWT SECRET';
} else {
  POSTGRES_URI = process.env['POSTGRES_URI'] || 'none';
  JWT_SECRET = process.env['JWT_SECRET'] || 'JWT_SECRET';
}

export const config = { PORT, POSTGRES_URI, validationOptions, JWT_SECRET };
