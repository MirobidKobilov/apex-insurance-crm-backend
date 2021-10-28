import * as dotenv from 'dotenv';
dotenv.config();

const NODE_ENV: string = process.env.NODE_ENV || 'dev';
const PORT: number = +process.env.PORT || 3000;
//CRM DB
const DB_TYPE: string = process.env.DB_TYPE || 'postgres';
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT: number = +process.env.DB_PORT || 5432;
const DB_USER: string = process.env.DB_USER || 'username';
const DB_PASS: string = process.env.DB_PASS || 'password';
const DB_NAME: string = process.env.DB_NAME || 'crm_db';
const DB_ENTITY_PATH: string = process.env.DB_ENTITY_PATH || '/../**/**/entities/**.entity{.ts,.js}';

export { NODE_ENV, PORT, DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, DB_ENTITY_PATH };
