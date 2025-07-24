import { Client } from 'pg';

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'strooper',
    password: 'root',
    port: 5432,
});
client.connect()
export default client;