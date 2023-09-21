const Pool = require("pg").Pool;
 
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'root',
  database: 'customad',
});

module.exports = pool;
