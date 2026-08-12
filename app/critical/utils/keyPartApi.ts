import { Area, Machine, Part } from "../models" 
import { DataI } from "../models"

const apiUrl: string = "http://localhost:4000/api"

const getAreaIDs = async (): Promise<Area[]> => {
  const res = await fetch(`${apiUrl}/area/`, {method: "GET"})

  return await res.json()
}

const getMachineIDs = async (): Promise<Machine[]> => {
  const res = await fetch(`${apiUrl}/machine/`, {method: "GET"})

  return await res.json()
}

const getParts = async (): Promise<Part[]> => {
  const res = await fetch(`${apiUrl}/part/`, {method: "GET"})

  return await res.json()
}

export const getKeyParts = async (): Promise<DataI> => {
  const areas = await getAreaIDs();
  const machines = await getMachineIDs();
  const parts = await getParts();

  const areaIDs = Object.fromEntries(
    areas.map((area: Area) => [area.id, area.area_name])
  );

  const machineLookup = Object.fromEntries(
    machines.map((machine: Machine) => [machine.id, machine])
  );

  const data: DataI = {};

  for (const part of parts) {
    const machine = machineLookup[part.machine];

    if (!machine) {
      console.warn(`Machine ${part.machine} not found.`);
      continue;
    }

    const areaName = areaIDs[machine.area];

    if (!areaName) {
      console.warn(`Area ${machine.area} not found.`);
      continue;
    }

    const machineName = machine.name;

    data[areaName] ??= {};
    data[areaName][machineName] ??= [];

    data[areaName][machineName].push(part);
  }

  return data;
};

