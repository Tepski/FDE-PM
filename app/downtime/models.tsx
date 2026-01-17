import {Dayjs} from "dayjs"

export interface DowntimeModel {
  id?: number,
  iticket: string,
  machine: string,
  area: string,
  date?: Dayjs,
  abnormality: string,
  partNo: string,
  action: string,
  type: string,
  shift?: string,
  start?: string,
  end?: string,
  duration?: number,
  actionBy: string,
}

export interface MachineModel {
  id?: number,
  name?: string,
  areaID?: number
}

export interface UserModel {
  id: number,
  u_id: string,
  name: string,
  position: string
}

