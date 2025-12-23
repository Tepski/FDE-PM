import {Dayjs} from "dayjs"

export interface DowntimeModel {
  id?: number,
  machine: string,
  date?: Dayjs,
  abnormality: string,
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

