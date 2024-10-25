const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'locationdb',
  password: '1',
  port: 5432,
})


module.exports = client;