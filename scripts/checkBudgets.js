require('dotenv').config({ path: '.env.local' });
const { Client } = require('pg');

(async () => {
  try {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      console.error('DATABASE_URL not set');
      process.exit(1);
    }
    const client = new Client({ connectionString });
    await client.connect();
    const res = await client.query('SELECT * FROM budgets;');
    console.log('budgets rows', res.rows);
    await client.end();
  } catch (err) {
    console.error('error querying budgets', err);
  }
})();