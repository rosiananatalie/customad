const Pool = require("pg").Pool;
 
const pool = new Pool({
  host: 'localhost',
  // host: 'customad.clbpwmmz6ntx.ap-southeast-1.rds.amazonaws.com',
  port: 5432,
  user: 'postgres',
  password: 'root',
  // password: 'postgresroot',
  database: 'customad',
});

module.exports = pool;
