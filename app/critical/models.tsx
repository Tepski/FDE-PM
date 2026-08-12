export interface Area {
  id: number,
  area_name: string,
}

export interface Machine {
  id: number,
  name: string,
  area: number,
}

export interface Part {
  id: number,
  machine: number,
  name: string,
  nrm_number: string,
  part_number: string,
  critical_level: string,
  current_stock: string,
}

export interface MachineI {
  [machineName: string]: Part[];
}

export interface DataI {
  [areaName: string]: MachineI;
} 
