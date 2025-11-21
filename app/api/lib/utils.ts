import { Pool } from "pg";

const pool = new Pool({
  user: "joseph",
  host: "192.168.3.12",
  database: "machine_database",
  password: "0837",
  port: 5432,
});

export default pool;
