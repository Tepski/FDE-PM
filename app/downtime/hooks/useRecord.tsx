import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { DowntimeModel } from "../models";
import { SelectChangeEvent } from "@mui/material";

const dummyData: DowntimeModel = {
  id: 0,
  iticket: "",
  area: "",
  date: dayjs(),
  machine: "",
  partNo: "",
  abnormality: "",
  type: "",
  action: "",
  shift: "",
  actionBy: "",
  start: dayjs(),
  end: dayjs()
}

export const useRecords = (setOpenModal: React.Dispatch<React.SetStateAction<ModalProp>>) => {
  const [machineData, setMachineData] = useState<DowntimeModel>(dummyData);
  const [tempUsers, setTempUsers] = useState<string[]>([])
  const [canSubmit, setCanSubmit] = useState<boolean>(false)

  const submitValidation = () => {
    if (
      machineData.iticket != "" &&
      machineData.area != "" &&
      machineData.machine != "" &&
      machineData.abnormality != "" &&
      machineData.type != "" &&
      machineData.action != "" &&
      machineData.actionBy != "" &&
      machineData.start &&
      machineData.end
    ) {
      setCanSubmit(true)
    } else {
      setCanSubmit(false)
    }
  }

  const handleUserChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: {value},
    } = event;

    setTempUsers(typeof value == "string" ? value.split(",") : value)
  }

  const onClose = () => {
    setMachineData(dummyData)
    setOpenModal((prev) => ({...prev, state: false}))
    setTempUsers([])
  }

  // Effects
  useEffect(() => {
    submitValidation()
    // console.log("MACHINE DATA:", machineData, canSubmit ? "Can" : "can't")
    console.log(JSON.stringify(machineData))
  }, [machineData])

  useEffect(() => {
    submitValidation()
  }, [])

  useEffect(() => {
    let usrs = ""

    if (tempUsers.length > 0) {
      for (let i = 0; i < tempUsers.length; i++) {
        if (i != 0) {
          usrs += ", "
        }
        usrs += tempUsers[i]
      }
    }

    setMachineData(prev => ({...prev, actionBy: usrs}))

  }, [tempUsers])

  return {
    dummyData,
    machineData,
    setMachineData,
    onClose,
    submitValidation,
    handleUserChange,
    setTempUsers,
    tempUsers,
    canSubmit,
  }
}
