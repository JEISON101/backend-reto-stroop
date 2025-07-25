import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'strooper',
    password: process.env.DB_PASSWORD,
    port: 5433 | 5432
}); 
client.connect()
export default client;