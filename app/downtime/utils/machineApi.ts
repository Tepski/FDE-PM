import { DowntimeModel, MachineModel, MachineObject } from "../models"

const URL = "192.168.3.50" // use 192.168.3.50 in deployment
const PORT = 8800

const handleRequest = async (endpoint: string): Promise<any> => {
    const res = await fetch(`http://${URL}:${PORT}/${endpoint}`);
    return await res.json();
}

export const GetDTWithOffset = async (page: number, key?: string, value?: string): Promise<DowntimeModel[]> => {
  try {
    const jsonData = await handleRequest(
      `api/dt_offset?limit=100&offset=${100 * (page - 1)}&key=${key}&value=${value}`
    )
    return (jsonData.data as DowntimeModel[]).slice(0, 100);
  } catch (e) {
    console.log("error occured:", e)
    return [];
  }
};

export const GetMachineList = async (): Promise<MachineObject[]> => {
  try {
    const res = await fetch(`http://${URL}:${PORT}/api/data`);
    const jsonData = await res.json();

    return (jsonData.data as MachineModel[]).map((machine) => ({
      label: machine.name ?? "",
      id: machine.id ?? "",
      area: machine.areaStr ?? "",
    }))
  } catch (e) {
    console.log("error occured:", e)
    return [];
  }
};

export const GetSingleDT = async (id: number): Promise<DowntimeModel | undefined> => {
  try {
    const res = await fetch(`http://${URL}:${PORT}/api/get_record/${id}`);
    const data = await res.json();

    return data.data as DowntimeModel;
  } catch (e) {
    console.log("error occured:", e)
    return undefined;
  }
}

export const PageCount = async(key: string, value: string): Promise<number> => {
  const res = await fetch(`http://${URL}:${PORT}/api/count?key=${key}&value=${value}`)
  const json = await res.json()
  const data = json.message
  const count = parseInt(data)
  const tabCount = Math.ceil(count / 100)
  
  return tabCount
}
