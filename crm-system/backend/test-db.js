const { Client } = require('pg');
const client = new Client({
  connectionString: "postgresql://crm:crm_password@127.0.0.1:5432/crm"
});

async function test() {
  try {
    console.log('Connecting to DB...');
    await client.connect();
    console.log('Connected!');
    const res = await client.query('SELECT current_database(), current_user');
    console.log('Query Result:', res.rows[0]);
    await client.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}

test();
