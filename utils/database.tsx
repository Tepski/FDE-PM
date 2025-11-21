import { Pool, QueryResult } from "pg";

const pool = new Pool({
  user: "joseph",
  host: "192.168.3.12",
  database: "machine_data",
  password: "0837",
  port: 5432,
});

const getMachines = async (): Promise<QueryResult> => {
  const res = await pool.query("SELECT * FROM data;")

  console.log(res)

  return res;
}

export {getMachines}
