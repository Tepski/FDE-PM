import { DataI, Part } from "../models";

export interface hookPartModel {
    part: DataI | undefined;
    active: Part[] | undefined;
    setPart: React.Dispatch<React.SetStateAction<DataI | undefined>>;
    setActive: React.Dispatch<React.SetStateAction<Part[] | undefined>>;
}
