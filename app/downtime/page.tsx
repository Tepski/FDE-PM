"use client"

import { useState, useEffect, FormEvent } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Files, RefreshCw, XIcon, Calendar } from "lucide-react";
import {DowntimeModel, UserModel, MachineModel} from "./models";
import { DatePicker, TimeField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { TextField, FormControl, MenuItem, InputLabel, Button, Autocomplete } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { machine } from "os";

const dummyData: DowntimeModel = {
  id: 0,
  date: dayjs(),
  machine: "",
  abnormality: "",
  type: "",
  action: "",
  shift: "",
  actionBy: ""
}

const downtime = () => {
  const DATA_HEADERS: string[] = ["Date", "Machine", "Abnormality", "Trouble Type", "Action Done", "Shift", "Duration", "Action By"];

  const [downtimes, setDowntimes] = useState<DowntimeModel[]>();
  const [users, setUsers] = useState<UserModel[]>();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [machineData, setMachineData] = useState<DowntimeModel>(dummyData);
  const [machineList, setMachineList] = useState<{label: string, id: number}[]>() 

  const getMachines = async () => {
    await fetch("http://127.0.0.1:8801/api/dt_records").then(res => {
      return res.json()
    }).then(data => {
      const dataList = data.data as DowntimeModel[]

      setDowntimes(() => dataList)
    })
  }

  const addRecord = async () => {
    const res = await fetch("http://127.0.0.1:8801/api/add_record", {method: "POST", body: JSON.stringify(machineData)})

    const data = await res.json()

    const temp = data.data
    const tempList = [machineData]
    tempList.toString

    if (res.status == 200) {
      setDowntimes((prev) => ([temp, ...prev ?? []]))
    }

  }

  const getData = async () => {
    await fetch("http://127.0.01:8801/api/data").then(res => {
      return res.json()
    }).then(data => {
      let toSend = []

      for (let machine of data.data as MachineModel[]) {
        const machObj = {label: machine.name ?? "", id: machine.id ?? 0}
        toSend.push(machObj)
      }

      setMachineList(() => toSend)
    })
  }

  const getUsers = async () => {
    await fetch("http://127.0.01:8801/api/users").then(res => {
      return res.json()
    }).then(data => {
      setUsers(() => data.data as UserModel[])
    })
  }

  const handleOnChange = <K extends keyof DowntimeModel>(key: K) =>
      (e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log("Selected:", e.target.value)
        setMachineData(prev => ({
        ...prev,
        [key]: e.target.value,
      }));
    };

  useEffect(() => {
    getMachines()
    getData()
    getUsers()
  }, [])

  const onClose = () => {
    setMachineData(dummyData)
    setOpenModal(false)
  }

  const onSubmit = (e: FormEvent) => {
   e.preventDefault()

    addRecord()

    onClose()
  }

  const dataTable = () => {
    return (
      <table className="w-full border border-gray-200 text-xs mt-2">
        <thead className="bg-gray-100 select-none sticky top-0">
          <tr className=""  >
            {DATA_HEADERS.map((header, index) => {
                return (
                  <th className={`px-4 py-2 ${index == 4 ? "w-3/10" : "1/10"} hover:bg-gray-200 hover:cursor-pointer border-b border-r border-[rgb(229,229,229)] font-semibold text-gray-600`} key={index.toString()}>{header}</th>
                )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {downtimes?.map((dt, index) => {
              return (
                <tr 
                  key={index.toString()} 
                  className={`text-center text-xs text-gray-500 hover:bg-gray-200 ${index == 4 ? "w-3/10" : "1/10"} ${index % 2 == 0 && "bg-blue-50" }`}
                >
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden font-semibold text-[10px]">{dt.date?.toString().split("T")[0]}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.machine}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.abnormality}</td> 
                  <td className={`py-2 border-x border-x-gray-200 overflow-hidden ${dt.type.includes("REPAIR") ? "text-yellow-800" : "text-blue-800"}`}>{dt.type}</td> 
                  <td className="py-2 border-x border-x-gray-200 truncate max-w-[200px] overflow-hidden text-start px-2">{dt.action}</td> 
                  <td 
                    className="p-2 border-x border-x-gray-200 overflow-hidden"
                  >
                    <p className={`${dt.shift?.trim() == "DAYSHIFT" ? "text-yellow-800 border-yellow-800 bg-yellow-300/30" : "text-gray-200 border-gray-800/30 bg-gray-500" } border rounded-sm`}>{dt.shift}</p>
                  </td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden font-bold">{dt.duration + " min."}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.actionBy}</td> 
                </tr> 
              )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-[5%] border-b-[rgb(229,229,229)] border-b-1 flex items-center justify-between px-4 sticky top-0 bg-white">

        <p className="text-gray-600 leading-12 font-bold" style={{fontFamily: '"Verdana", sans-serif'}}>DAILY DOWNTIME MONITORING</p>

        <div className="w-[30%] h-full py-2 flex items-center">
          <input placeholder="search" className="border border-gray-400 w-full h-[95%] rounded-full py-2 px-4"></input>
        </div>

        <div className="flex items-center">
          <div className="text-gray-600 pe-6 border-e border-e-black">
            <RefreshCw size={20} className="hover:cursor-pointer" />
          </div>
          <p 
            onClick={() => setOpenModal(true)}
            className="hover:bg-gray-200 hover:cursor-pointer rounded-md ms-2 text-sm py-1 px-2 items-center flex flex-row gap-2 text-gray-600"
          >
            <span>
              <Files size={18} />
            </span> NEW RECORD
          </p>
        </div>
      </div>

      <div className="w-full h-[95%] overflow-auto pb-4">
        <div className={`body mx-8 flex flex-col justify-start items-start ${!downtimes && "h-full"}`}>
          {downtimes ? dataTable() : <div className="h-full w-full flex justify-center items-center">Wait, wala pang laman</div>}
        </div>
      </div>

      {openModal && 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="bg-black/70 w-full h-full absolute top-0 left-0 flex justify-center items-center">
              <div className="w-[20%] h-auto bg-white rounded-md flex-col flex justify-center items-center p-4">
                <div className="w-full h-full flex flex-1 items-start justify-between pb-4">
                  <p className="text-gray-600">Downtime Details</p> 
                  <XIcon size={"16px"} className="text-gray-600 hover:cursor-pointer active:opacity-80" onClick={onClose}/>
                </div>            
                  <form className="w-full h-full Body flex flex-16 flex-col gap-4 text-sm" onSubmit={onSubmit}>

                  {machineList &&  
                    <Autocomplete
                      disablePortal
                      onChange={(_, newVal) => (
                        setMachineData((prev) => ({...prev, machine: newVal?.label ?? ""}))
                      )}
                      options={machineList}
                      getOptionKey={(machine) => machine.id}
                      renderInput={(params) => <TextField {...params} label="Machine" value={machineData.machine} />}
                    /> 
                  }

                    <TextField label="Abnormality" value={machineData?.abnormality} onChange={handleOnChange("abnormality")}/>

                    <FormControl> 
                      <InputLabel id="type-label">Type</InputLabel>
                      <Select labelId="type-label" id="type" label="Type" value={machineData?.type} onChange={handleOnChange("type")}>
                        <MenuItem value="Repair">Repair</MenuItem>
                        <MenuItem value="Adjustment">Adjustment</MenuItem>
                        <MenuItem value="Adj & Rep">Adjustment and Repair</MenuItem>
                      </Select>
                    </FormControl>

                    <textarea value={machineData?.action} className="border border-[rgb(229,229,229)] text-md rounded-md p-2 max-h-60 min-h-20" onChange={handleOnChange("action")} placeholder="Action Done"/> 

                    <DatePicker label="Date" value={dayjs(machineData.date)}onChange={val => setMachineData((prev) => ({...prev, date: val ? val.toDate() : prev.date}))} />  

                    <div className="w-full flex justify-evenly gap-2">
                      <TimeField label="From" onChange={val => setMachineData((prev) => ({...prev, start: val?.toString()}))}/> 
                      <TimeField label="To" onChange={val => setMachineData((prev) => ({...prev, end: val?.toString()}))}/> 
                    </div> 

                    <div className="w-full h-full Confirm flex flex-2 gap-2 justify-around py-4 border-t border-[rgb(229,229,229)]">
                      <div className="w-full flex">
                        <FormControl fullWidth size="small" >
                          <InputLabel id="fde-label">FDE</InputLabel>
                          <Select labelId="fde-label" id="fde" className="text-sm"label="FDE" value={machineData.actionBy ?? ""} onChange={handleOnChange("actionBy")}>
                            {users?.map((user, index) => {
                              return (
                                <MenuItem value={user.name} key={user.u_id + index}>{user.name}</MenuItem>
                              ) 
                            })} 
                          </Select>
                        </FormControl>
                      </div> 
                  
                      <div className="w-full flex">
                        <Button variant="contained" fullWidth size="small" type="submit">SUBMIT</Button>
                      </div>

                    </div>            
                  </form> 
              </div>
          </div>
        </LocalizationProvider>
      }

      {openModal &&
        <div className="absolute top-2 left-2">
          <p className="text-white">Machine: {machineData.machine}</p>
          <p className="text-white">Abnormality: {machineData.abnormality}</p>
          <p className="text-white">Type: {machineData.type}</p>
          <p className="text-white">Action: {machineData.action}</p>
          <p className="text-white">Date: {machineData.date?.toString()}</p>
          <p className="text-white">From: {machineData.start}</p>
          <p className="text-white">To: {machineData.end}</p>
          <p className="text-white">Action By: {machineData.actionBy}</p>
        </div>
      }
    </div>
  )
};

export default downtime;
