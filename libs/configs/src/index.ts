import * as dotenv from 'dotenv';
import { validationOptions } from './validation.config';

dotenv.config();

const SERVER_PORT: number = parseInt(process.env['SERVER_PORT'] || '5000', 10);

let DATABASE_URL: string;
let JWT_SECRET: string;

DATABASE_URL = process.env['DATABASE_URL'] || 'none';
JWT_SECRET = process.env['JWT_SECRET'] || 'JWT_SECRET';

export const config = {
  SERVER_PORT,
  DATABASE_URL,
  validationOptions,
  JWT_SECRET,
};
