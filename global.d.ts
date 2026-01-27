import { UserModel } from "./app/downtime/models";

export {};

declare global {
  interface Items {
    title: string,
    active: boolean,
    selected: boolean,
    path: string,
    icon: JSX.Element,
  }

  interface DataI {
    name: string,
    data_id: number,
    area_id: string
  }

  interface AreaI {
    area: string,
    area_id: number
  }

  interface CodeI {
    code: string,
    data_id: number,
    code_id: number
  }

  interface MachineData {
    data: DataI[],
    area: AreaI[],
    code: CodeI[],
  }

  interface SelectedData {
    data?: string,
    area?: string,
    code?: string,
  }

  interface ModalI {
    machineData?: MachineData;
    type: "Filter" | "Data" | "Form" | undefined
    users?: UserModel[]
    filter?: (names: string[]) => void
    close: () => void
  }

  interface FormI {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    machineData:  MachineData,
    selectedData: SelectedData,
    setSelectedData: React.Dispatch<React.SetStateAction<SelectedData | undefined>>
  }
}
