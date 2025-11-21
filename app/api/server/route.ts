import pool from "../lib/utils"

interface GetParams {
  params: string
};

interface ReturnI {
  data: any,
  area: any,
  code: any
}

export const GET = async ( request: Request, {params}: GetParams ) => {
  const machine_data = await pool.query("SELECT * FROM data;")
  const machine_area = await pool.query("SELECT * FROM area;")
  const machine_code = await pool.query("SELECT * FROM machine_code;")

  const data_json = machine_data.rows
  const area_json = machine_area.rows
  const code_json = machine_code.rows

  const returnData: ReturnI =  {
    data: data_json,
    area: area_json,
    code: code_json,
  }

  return Response.json(returnData)
}

