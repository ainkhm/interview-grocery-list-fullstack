import * as dotenv from 'dotenv';
import { validationOptions } from './validation.config';

dotenv.config();

const SERVER_PORT: number = parseInt(process.env['SERVER_PORT'] || '5000', 10);

let DATABASE_URL: string;
let JWT_SECRET: string;

if (process.env['NODE_ENV'] === 'development') {
  DATABASE_URL =
    process.env['DATABASE_URL'] ||
    'postgres://admin:password1@localhost:5432/goji_interview';
  JWT_SECRET = 'JWT SECRET';
} else {
  DATABASE_URL = process.env['DATABASE_URL'] || 'none';
  JWT_SECRET = process.env['JWT_SECRET'] || 'JWT_SECRET';
}

console.log(SERVER_PORT, DATABASE_URL, validationOptions, JWT_SECRET);

export const config = {
  SERVER_PORT,
  DATABASE_URL,
  validationOptions,
  JWT_SECRET,
};
