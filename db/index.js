require("dotenv").config();
const { Pool } = require("pg");

const devConfig = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
};

const pool = new Pool(devConfig);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
