import * as dotenv from 'dotenv';

dotenv.config();
const NODE_ENV: string = process.env.NODE_ENV || 'dev';
const PORT: number = +process.env.PORT || 3000;

export { NODE_ENV, PORT };
