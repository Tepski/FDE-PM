import { useState } from "react"
import { dayCalendarClasses, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MachineHook } from "../hookModels"
import { XIcon } from "lucide-react"
import { DowntimeModel, UserModel } from "../models"
import { FormEvent } from "react"
import { DateTimePicker } from "@mui/x-date-pickers"  
import { RecordHook } from "../hookModels"

import dayjs from "dayjs"

import { TextField, FormControl, MenuItem, InputLabel, Button, 
  Autocomplete, FormGroup, Checkbox, FormControlLabel 
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CheckboxProps } from "antd"

interface NewRecordProps {
  openModal: ModalProp,
  machine: MachineHook,
  update: boolean,
  users: UserModel[],
  record: RecordHook
}

const PORT: string = "8800"
const URL: string = "192.168.3.50"

interface CheckProps {
  "abnormality": string,
  "user": string,
  "start": string,
  "end": string,
  "duration": number,
  "action": string,
}

export const NewRecord = ({
  openModal,
  machine,
  update,
  users,
  record
}: NewRecordProps) => {


  const [usedSpare, setUsedSpare] = useState<boolean>(false)

  const onSubmit = (e: FormEvent, id: number | undefined) => {
    e.preventDefault()
    console.log("Submit Success")

    if (!update) {
      addRecord()
    } else {
      updateRecord(record.machineData.id)
      record.setMachineData(record.dummyData)
      window.location.reload()
    }

    record.onClose()
  }

  const onCheck = async (ticket: string) => {
    if (ticket.length > 5) {
      const tickSplit = ticket.split("=")
      ticket = tickSplit[tickSplit.length - 1]
    }

    const res = await fetch(`http://localhost:8000/${ticket}`)
    const data = await res.json()

    const checkData = data as CheckProps

    if (!checkData) {
      return
    }

    record.setMachineData((prev) => ({
      ...prev, 
      abnormality: checkData.abnormality ?? "", 
      start: dayjs(checkData.start, "YYYY.MM.DD HH:mm") ?? null,
      end: dayjs(checkData.end, "YYYY.MM.DD HH:mm") ?? null,
      actionBy: checkData.user ?? "",
      action: checkData.action ?? "",
    }))

    record.setTempUsers(() => [checkData.user])
  }

  const addRecord = async () => {
    const res = await fetch(
      `http://${URL}:${PORT}/api/add_record`, 
      {method: "POST", body: JSON.stringify(record.machineData)}
    )

    const data = await res.json()

    console.log(data)

    const temp = data.data
    const tempList = [record.machineData]
    tempList.toString

    if (res.status == 200) {
      machine.updateDowntime(temp)
    } else {
      console.log("Failed, for some fucking reason")
    }
  }

  const updateRecord = async (id: number | undefined) => {
    if (!id) {
      console.log("Cannot find ID")

      return
    }
    const res = await fetch(
      `http://${URL}:${PORT}/api/update_downtime/${id}`, 
      {method: "PUT", body: JSON.stringify(record.machineData)}
    )

    const data = await res.json()
  }

  const handleOnChange = <K extends keyof DowntimeModel>(key: K) =>
    (e: SelectChangeEvent | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      record.setMachineData((prev: DowntimeModel) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  return (
    openModal.state && !openModal.type && 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="bg-black/70 w-full h-full absolute top-0 left-0 flex justify-center items-center z-30">
            <div className="w-[20%] h-auto bg-white rounded-md flex-col flex justify-center items-center p-4">
              <div className="w-full h-full flex flex-1 items-start justify-between pb-4">
                <p className="text-gray-600">Downtime Details</p> 
                <XIcon size={"16px"} className="text-gray-600 hover:cursor-pointer active:opacity-80" onClick={record.onClose}/>
              </div>            
                <div className="w-full h-full Body flex flex-16 flex-col gap-4 text-sm">
                                                                                                                                                                                                               
                {machine.machineList &&  
                  <div className="flex flex-row w-full gap-2">
                    <Autocomplete
                      disablePortal
                      value={record.machineData && record.machineData.machine}
                      onChange={(_, newVal) => {
                        console.log("New Value", newVal)
                        record.setMachineData((prev: DowntimeModel) => ({...prev, 
                          machine: typeof newVal == "string" ? newVal : newVal?.label ?? "", 
                          area: typeof newVal == "string" ? "" : newVal?.area ?? ""}))
                      }}
                      freeSolo
                      className="w-[70%]"
                      options={machine.machineList}
                      getOptionKey={(machine) => typeof machine == "string" ? machine : machine.id}
                      renderInput={(params) => <TextField {...params} label="Machine" value={record.machineData.machine} />}
                    /> 
                                                                                                                                                                                                               
                    <FormControl className="w-[30%]"> 
                      <InputLabel id="type-label">Area</InputLabel>
                      <Select labelId="type-label" id="type" label="Type" value={record.machineData?.area} onChange={handleOnChange("area")}>
                        <MenuItem value="20CY">20CY</MenuItem>
                        <MenuItem value="20CY Expansion">20CY Expansion</MenuItem>
                        <MenuItem value="21MY">21MY</MenuItem>
                        <MenuItem value="CT">CT</MenuItem>
                        <MenuItem value="OT">OT</MenuItem>
                        <MenuItem value="PNT">Painting</MenuItem>
                        <MenuItem value="PZT">PZT</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                }
                                                                                                                                                                                                               
                  <div className="flex justify-between gap-2">
                    <TextField className="w-[80%]" label="iTicket" value={record.machineData?.iticket} onChange={handleOnChange("iticket")}/>
                      <Button 
                        variant="contained" 
                        disabled={!record.machineData?.iticket}
                        onClick={() => {onCheck(record.machineData?.iticket)}} 
                        size="small" 
                        type="submit">Check
                      </Button>
                  </div>
                  <TextField label="Abnormality" value={record.machineData?.abnormality} onChange={handleOnChange("abnormality")}/>
                                                                                                                                                                                                               
                  <FormControl> 
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select labelId="type-label" id="type" label="Type" value={record.machineData?.type} onChange={handleOnChange("type")}>
                      <MenuItem value="Repair">Repair</MenuItem>
                      <MenuItem value="Adjustment">Adjustment</MenuItem>
                      <MenuItem value="Adj & Rep">Adjustment and Repair</MenuItem>
                      <MenuItem value="Maintenance">Maintenance</MenuItem>
                      <MenuItem value="Replacement">Replacement</MenuItem>
                      <MenuItem value="Set-up">Machine Set-up</MenuItem>
                      <MenuItem value="Change Model">Change Model</MenuItem>
                      <MenuItem value="Transfer">Machine Transfer</MenuItem>
                    </Select>
                  </FormControl>
                  
                  <FormGroup>
                    <FormControlLabel 
                      control={<Checkbox />} 
                      checked={usedSpare} 
                      onChange={(
                        e: React.SyntheticEvent<Element, Event>, 
                        checked: boolean
                      ) => setUsedSpare(checked)} 
                      label="Spare Parts Used?" className="text-gray-600"/>
                  </FormGroup>
                                                                                                                                                                                                               
                  {usedSpare && 
                    <>
                      <TextField label="Part/NRM No." value={record.machineData?.partNo} onChange={handleOnChange("partNo")}/>
                     <a 
                       href="http://192.168.3.12:8880/" 
                       target="_blank"
                       rel="noopener noreferer"
                       className="text-sm text-gray-400 hover:cursor-pointer underline"
                     >View Spare Parts</a>
                    </>
                  }
                    
                  <textarea 
                    value={record.machineData?.action} 
                    className="border border-[rgb(200,200,200)] text-md rounded-md p-2 max-h-60 min-h-20" 
                    onChange={handleOnChange("action")} 
                    placeholder="Action Done"
                  /> 
                                                                                                                                                                                                               
                  {/*TIME PICKERS*/}
                  <DateTimePicker 
                    label="From" 
                    value={record.machineData.start} 
                    ampm={false}
                    timeSteps={{ minutes: 1 }}
                    onChange={newVal => (
                        record.setMachineData((prev: DowntimeModel) => ({
                          ...prev, start: dayjs(newVal), end: dayjs(newVal)
                      }))
                    )}  
                  />
                                                                                                                                                                                                               
                  <DateTimePicker 
                    label="To" 
                    value={record.machineData.end} 
                    timeSteps={{ minutes: 1 }}
                    ampm={false}
                    minDate={record.machineData.start}
                    minTime={record.machineData.start?.date() == record.machineData.end?.date() ? record.machineData.start : undefined}
                    onChange={newVal => (
                      record.setMachineData((prev: DowntimeModel)=> ({
                        ...prev, end: dayjs(newVal)
                      }))
                    )}
                  />
              
                  {record.machineData.actionBy && <p className="text-gray-500 text-sm">{record.machineData.actionBy}</p>}
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
                          value={record.tempUsers}
                          onChange={record.handleUserChange}
                        >
                          {users?.sort((a, b) => (a.name.localeCompare(b.name)))?.map((user, index) => {
                            return (
                              <MenuItem value={user.name} key={user.u_id + index}>{user.name}</MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </div>
                
                    <div className="w-full flex">
                      <Button 
                        variant="contained" 
                        disabled={!record.canSubmit} 
                        onClick={(e) => onSubmit(e, record.machineData.id)} 
                        fullWidth 
                        size="small" 
                        type="submit">{update ? "UPDATE" : "SUBMIT"}
                      </Button>
                    </div>
                  </div>            
                </div>
            </div>
        </div>
      </LocalizationProvider>
  )
}
