import { DowntimeModel, MachineObject } from "./models";
import { SelectChangeEvent } from "@mui/material";
import { MenuProps } from "antd";
import { useMachines } from "./hooks/useMachine";

export interface MachineHook {
    machineList: MachineObject[] | undefined;
    viewData: DowntimeModel | undefined;
    downtimes: DowntimeModel[] | undefined;
    select: string;
    search: string;
    pages: {
        current: number;
        tabs: number;
    };
    setPages: React.Dispatch<React.SetStateAction<{
        current: number;
        tabs: number;
    }>>;
    setSelect: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    getDowntimeData: (page: number, value: string) => Promise<void>;
    getMachineList: () => Promise<void>;
    getItems: (data: string[][]) => MenuProps["items"];
    updateDowntime: (data: any) => void;
    updateTabcount: (val: string) => Promise<void>;
    handleSearch: (val: string) => void;
    getSingleMachine: (
      id: number, 
      setModal: React.Dispatch<React.SetStateAction<ModalProp>>
    ) => Promise<void>;
}


export interface RecordHook {
    dummyData: DowntimeModel;
    machineData: DowntimeModel;
    setMachineData: React.Dispatch<React.SetStateAction<DowntimeModel>>;
    onClose: () => void;
    submitValidation: () => void;
    handleUserChange: (event: SelectChangeEvent<string[]>) => void;
    tempUsers: string[];
    canSubmit: boolean;
    setTempUsers: React.Dispatch<React.SetStateAction<string[]>>;

  }
