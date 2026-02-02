"use client"

import { useState, useEffect, FormEvent } from "react";
import dayjs from "dayjs";
import { Files, XIcon, Maximize, Minimize } from "lucide-react";
import {DowntimeModel, UserModel, MachineModel} from "./models";
import { DatePicker, TimeField } from "@mui/x-date-pickers";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Modals from "./components";

import { TextField, FormControl, MenuItem, InputLabel, Button, Autocomplete, FormGroup, Checkbox, FormControlLabel, Modal } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

const PORT: string = "8805";

const downtime = () => {
  const DATA_HEADERS: string[][] = [["Date", "date"], ["iTicket", "iticket"], ["Machine", "machine"], 
    ["Area", "area"], ["Part Replaced", "partNo"], ["Abnormality", "abnormality"], ["Trouble Type", "type"], 
    ["Action Done", "action"], ["Duration", "duration"], ["Action By", "actionBy"]];

  interface FilterValue {
    key: keyof DowntimeModel,
    value: string | number
    choices?: string[]
  }

  const [downtimes, setDowntimes] = useState<DowntimeModel[]>();
  const [users, setUsers] = useState<UserModel[]>();
  const [machineData, setMachineData] = useState<DowntimeModel>(dummyData);
  const [machineList, setMachineList] = useState<{label: string, id: number}[]>() 
  const [maximize, setMaximize] = useState<boolean>(false);
  const [usedSpare, setUsedSpare] = useState<boolean>(false)
  const [canSubmit, setCanSubmit] = useState<boolean>(false)
  const [filterData, setFilterData] = useState<FilterValue>()
  const [tempUsers, setTempUsers] = useState<string[]>([])
  const [viewData, setViewData] = useState<DowntimeModel | undefined>();

  const [openModal, setOpenModal] = useState<{state: boolean, type: "Form" | "Data" | "Filter" | undefined}>({state: false, type: undefined})
  
  const getMachines = async (filter: FilterValue | undefined) => {
    await fetch(`http://192.168.3.50:${PORT}/api/dt_records`).then(res => {
      return res.json()
    }).then(data => {
      let dataList = data.data as DowntimeModel[]
      if (filter) {
        dataList = dataList.filter((data) => { return data[filter.key] == filter.value })
      }

      setDowntimes(() => dataList)
    }).catch(e => {
      console.log("error occured:", e)
    })
  }

  const addRecord = async () => {
    const res = await fetch(`http://192.168.3.50:${PORT}/api/add_record`, {method: "POST", body: JSON.stringify(machineData)})

    const data = await res.json()

    console.log(data)

    const temp = data.data
    const tempList = [machineData]
    tempList.toString

    if (res.status == 200) {
      setDowntimes((prev) => ([temp, ...prev ?? []]))
    }
  }

  const getData = async () => {
    await fetch(`http://192.168.3.50:${PORT}/api/data`).then(res => {
      return res.json()
    }).then(data => {
      let toSend = []

      console.log("Data fetched:", data)

      for (let machine of data.data as MachineModel[]) {
        const machObj = {label: machine.name ?? "", id: machine.id ?? 0}
        toSend.push(machObj)
      }

      setMachineList(() => toSend)
    }).catch((e) => {
      console.log("An error occured:", e)
    })
  }

  const getUsers = async () => {
    await fetch(`http://192.168.3.50:${PORT}/api/users`).then(res => {
      return res.json()
    }).then(data => {
      setUsers(() => data.data as UserModel[])
    })
  }

  const validateTimeRange = (d1: dayjs.Dayjs, d2: dayjs.Dayjs) => {
    
  }

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

  const setLocal = (key: string, value: string) => {
    window.localStorage.setItem(key, value)
  }

  const handleOnChange = <K extends keyof DowntimeModel>(key: K) =>
    (e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log("Selected:", e.target.value)
      setMachineData(prev => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleFilter = (key: keyof DowntimeModel) => {
    console.log("Pinipindot ko na erps...")
    setFilterData({key: key, value: ""})

    const choices = new Set(downtimes?.map((item) => {return item[key]}))
    console.log("Eto and Direct:", choices)
    setOpenModal({state: true, type: "Filter"})
  }
  
  const handleUserChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: {value},
    } = event;

    setTempUsers(typeof value == "string" ? value.split(",") : value)
  }

  useEffect(() => {
    submitValidation()
    console.log("Eto yung change pre ->:", machineData)
  }, [machineData])

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


  const onClose = () => {
    setMachineData(dummyData)
    setOpenModal((prev) => ({...prev, state: false}))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log("Submit Success")

    addRecord()
    onClose()
  }

  const handleViewData = (data: DowntimeModel) => {
    setViewData(() => data)
    setOpenModal(() => ({state: true, type: "Data"}))
  }

  const filterFuncTest = (names: string[]) => {
    const filtered = downtimes?.filter((dt) => {

      for (let usr of names) {
        if (dt.actionBy.includes(usr)) {
          return true
        }
      }
      
      return false
    })

    setDowntimes(() => filtered)

    onClose()
  }

  // .effects

  const handleEdit = (data: DowntimeModel) => {
    data.iticket = data.iticket.slice(data.iticket.length - 6, data.iticket.length)
    console.log("Machine sa data to pre:", data.machine)
    onClose()
    setMachineData(data)
    setOpenModal({state: true, type: undefined})
  }

  useEffect(() => {
    getMachines(undefined)
    getData()
    getUsers()
    submitValidation()

    return () => {
      setLocal("maximize", JSON.stringify(maximize))
    }
  }, [])

  const dataTable = () => {
    return (
      <table className="w-full border border-gray-200 text-xs mt-2">
        <thead className="bg-gray-100 select-none sticky top-0">
          <tr className=""  >
            {DATA_HEADERS.map((header, index) => {
                return (
                  <th 
                    className={`px-4 py-2 w-[${String(1/DATA_HEADERS.length)}]  hover:bg-gray-200 hover:cursor-pointer 
                      border-b border-r border-[rgb(229,229,229)] font-semibold text-gray-600`} 
                    key={index.toString()}
                    onClick={() => handleFilter(header[1] as keyof DowntimeModel)}
                  >
                  {header[0]}
                  </th>
                )
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {downtimes?.map((dt, index) => {
              return (
                <tr 
                  key={index.toString()} 
                  className={`text-center text-xs text-gray-500 hover:bg-gray-200 hover:cursor-pointer active:bg-gray-300 ${index % 2 != 0 && "bg-blue-50" }`}
                  onClick={() => handleViewData(dt)}
                >
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden font-semibold text-[10px]">{dt.date?.toString().split("T")[0]}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden font-semibold text-[10px] z-30">
                    <a 
                      onClick={(e) => e.stopPropagation()}
                      href={dt.iticket}
                      target="_blank"
                      rel="noopener noreferer"
                      className="text-blue-800 underline"
                    >
                      {dt.iticket.substring(dt.iticket.length - 6)}
                    </a>
                  </td>
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.machine}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.area}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.partNo != "" ? dt.partNo : "n/a"}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.abnormality}</td> 
                  <td className={`py-2 border-x border-x-gray-200 overflow-hidden ${dt.type.includes("Rep") ? "text-red-400" : "text-blue-800"}`}>{dt.type}</td> 
                  <td className="py-2 border-x border-x-gray-200 truncate max-w-[200px] overflow-hidden text-start px-2">{dt.action}</td> 
                  <td className={`py-2 border-x border-x-gray-200 overflow-hidden font-bold ${dt.duration && dt.duration >= 60 && "text-red-400"}`}>{dt.duration + " min."}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.actionBy}</td> 
                </tr> 
              )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div className={`overflow-hidden ${maximize && "absolute top-0 left-0 w-full h-screen"}" bg-white h-full w-full`}>
      <div className="w-full h-[5%] border-b-[rgb(229,229,229)] border-b flex items-center justify-between px-4 sticky top-0 bg-white">
        <p className="text-gray-600 leading-12 font-bold" style={{fontFamily: '"Verdana", sans-serif'}}>DAILY DOWNTIME MONITORING</p>
        <div className="w-[30%] h-full py-2 flex items-center">
          <input placeholder="search" className="border border-gray-400 w-full h-[95%] rounded-full py-2 px-4"></input>
        </div>
        <div className="flex items-center">
        <div className="text-gray-600 pe-6 border-e border-e-black" onClick={() =>  setMaximize(!maximize)}>
            {maximize ? <Minimize size={20} className="hover:cursor-pointer" /> : <Maximize size={20} className="hover:cursor-pointer" />}
          </div>
          <p 
            onClick={() => setOpenModal({state: true, type: undefined})}
            className="hover:bg-gray-200 hover:cursor-pointer rounded-md ms-2 text-sm py-1 px-2 items-center flex flex-row gap-2 text-gray-600"
          >
            <span>
              <Files size={18} />
            </span> 
            NEW RECORD
          </p>
        </div>
      </div>

      <div className="w-full h-[95%] overflow-auto pb-4">
        <div className={`body mx-8 flex flex-col justify-start items-start ${!downtimes && "h-full"}`}>
          {downtimes ? dataTable() : <div className="h-full w-full flex justify-center items-center">Wait, wala pang laman</div>}
        </div>
      </div>

      {openModal.state && openModal.type && 
        <div className="w-full h-full flex justify-center bg-black/20 items-center absolute top-0 left-0">
          <div className="w-auto h-[80%] rounded-xl bg-white shadow-sm shadow-black/20"> 
          {openModal.type == "Filter" ? 
            <Modals type={openModal.type} close={onClose} users={users} filter={filterFuncTest} edit={handleEdit}/>
            :
            viewData && <Modals type={openModal.type} close={onClose} edit={handleEdit} machineData={viewData ? viewData : dummyData} />
          }
          </div>
        </div>
      }

      {openModal.state && !openModal.type && 
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="bg-black/70 w-full h-full absolute top-0 left-0 flex justify-center items-center z-30">
              <div className="w-[20%] h-auto bg-white rounded-md flex-col flex justify-center items-center p-4">
                <div className="w-full h-full flex flex-1 items-start justify-between pb-4">
                  <p className="text-gray-600">Downtime Details</p> 
                  <XIcon size={"16px"} className="text-gray-600 hover:cursor-pointer active:opacity-80" onClick={onClose}/>
                </div>            
                  <div className="w-full h-full Body flex flex-16 flex-col gap-4 text-sm">

                  {machineList &&  
                    <div className="flex flex-row w-full gap-2">
                      <Autocomplete
                        disablePortal
                        onChange={(what, newVal) => {
                          console.log("what", what, "New Value", newVal)
                          setMachineData((prev) => ({...prev, machine: newVal?.label ?? ""}))
                        }}
                        freeSolo
                        className="w-[70%]"
                        options={machineList}
                        getOptionKey={(machine) => machine.id}
                        renderInput={(params) => <TextField {...params} label="Machine" value={machineData.machine} />}
                      /> 

                      <FormControl className="w-[30%]"> 
                        <InputLabel id="type-label">Area</InputLabel>
                        <Select labelId="type-label" id="type" label="Type" value={machineData?.area} onChange={handleOnChange("area")}>
                          <MenuItem value="20CY">20CY</MenuItem>
                          <MenuItem value="21MY">21MY</MenuItem>
                          <MenuItem value="CT">CT</MenuItem>
                          <MenuItem value="OT">OT</MenuItem>
                          <MenuItem value="PNT">Painting</MenuItem>
                          <MenuItem value="PZT">PZT</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  }

                    <TextField label="iTicket" value={machineData?.iticket} onChange={handleOnChange("iticket")}/>
                    <TextField label="Abnormality" value={machineData?.abnormality} onChange={handleOnChange("abnormality")}/>

                    <FormControl> 
                      <InputLabel id="type-label">Type</InputLabel>
                      <Select labelId="type-label" id="type" label="Type" value={machineData?.type} onChange={handleOnChange("type")}>
                        <MenuItem value="Repair">Repair</MenuItem>
                        <MenuItem value="Adjustment">Adjustment</MenuItem>
                        <MenuItem value="Adj & Rep">Adjustment and Repair</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                      </Select>
                    </FormControl>
                    
                    <FormGroup>
                      <FormControlLabel 
                        control={<Checkbox />} 
                        checked={usedSpare} 
                        onChange={(e: React.SyntheticEvent<Element, Event>, checked: boolean) => setUsedSpare(checked)} 
                        label="Spare Parts Used?" className="text-gray-600"/>
                    </FormGroup>

                    {usedSpare && 
                      <>
                        <TextField label="Part/NRM No." value={machineData?.partNo} onChange={handleOnChange("partNo")}/>
                       <a 
                         href="http://192.168.3.12:8880/" 
                         target="_blank"
                         rel="noopener noreferer"
                         className="text-sm text-gray-400 hover:cursor-pointer underline"
                       >
                         View Spare Parts
                      </a>
                      </>
                    }
                      
                    <textarea value={machineData?.action} className="border border-[rgb(229,229,229)] text-md rounded-md p-2 max-h-60 min-h-20" onChange={handleOnChange("action")} placeholder="Action Done"/> 

                    {/*
                    <DatePicker 
                      label="Date"
                      value={machineData.date} 
                      onChange={val => setMachineData((prev) => ({
                        ...prev, 
                        date: val ?? prev.date
                      }))} 
                    />  

                    <div className="w-full flex items-center justify-evenly gap-2">
                      <TimeField label="From" format="HH:mm" ampm={false} onChange={val => setMachineData((prev) => ({...prev, start: val?.toString()}))}/> 
                      <ArrowRight />
                      <TimeField label="To" format="HH:mm" ampm={false} onChange={val => setMachineData((prev) => ({...prev, end: val?.toString()}))}/> 
                    </div> 
                    */}

                   <DateTimeRangePicker />

                    <div className="w-full h-full Confirm flex flex-2 gap-2 justify-around py-4 border-t border-[rgb(229,229,229)]">
                      <div className="w-full flex max-w-[50%]">
                        <FormControl fullWidth size="small" >
                          <InputLabel id="fde-label">FDE</InputLabel>
                          <Select 
                            labelId="fde-label" 
                            id="fde" 
                            multiple
                            className="text-sm"
                            label="FDE" 
                            value={tempUsers} 
                            onChange={handleUserChange}                    
                          >
                            {users?.map((user, index) => {
                              return (
                                <MenuItem value={user.name} key={user.u_id + index}>{user.name}</MenuItem>
                              ) 
                            })} 
                          </Select>
                        </FormControl>
                      </div>
                  
                      <div className="w-full flex">
                        <Button variant="contained" disabled={!canSubmit} onClick={onSubmit} fullWidth size="small" type="submit">SUBMIT</Button>
                      </div>

                    </div>            
                  </div>
              </div>
          </div>
        </LocalizationProvider>
      }
    </div>
  )
};
export default downtime;
