"use client"

// UTILS
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import {DowntimeModel, UserModel } from "./models";
import Modals from "./validation";

// HOOKS
import { useSearchParams } from "next/navigation";  
import { useMachines } from "./hooks/useMachine";
import { useRecords } from "./hooks/useRecord";

// COMPONENTS
import { DataTable } from "./components/dataTable";
import { PageHeader } from "./components/pageHeader";
import { NewRecord } from "./components/recordHandler";

// UI
import { Pagination } from "@mui/material";
import { CircleX } from "lucide-react";

const PORT: string = "8800";
const URL: string = "192.168.3.50" // set 127.0.0.1 for dev, 192.168.3.50 for prod

const DowntimeClient = () => {
  const DATA_HEADERS: string[][] = [["Date", "date"], ["iTicket", "iticket"], ["Machine", "machine"], 
    ["Area", "area"], ["Part Replaced", "partNo"], ["Abnormality", "abnormality"], ["Trouble Type", "type"], 
    ["Action Done", "action"], ["Duration", "duration"], ["Action By", "actionBy"]];

  const searchParams = useSearchParams()
  const [users, setUsers] = useState<UserModel[]>([]);
  const [maximize, setMaximize] = useState<boolean>(false);
  const [tempUsers, setTempUsers] = useState<string[]>([])
  const [viewData, setViewData] = useState<DowntimeModel | undefined>();
  const [update, setUpdate] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<ModalProp>({state: false, type: undefined})

  const machine = useMachines();
  const records = useRecords(setOpenModal);

  useEffect(() => {
    const param = searchParams.get("item-id")

    if (!param) return

    machine.getSingleMachine(parseInt(param as string), setOpenModal)
  }, [])

  const getUsers = async () => {
    await fetch(`http://${URL}:${PORT}/api/users`).then(res => {
      return res.json()
    }).then(data => {
      setUsers(() => data.data as UserModel[])
    })
  }

  const setLocal = (key: string, value: string) => {
    window.localStorage.setItem(key, value)
  }

  const pageControl = (value:number) => {
    machine.setPages((prev) => ({...prev, current: value}))
    machine.getDowntimeData(value, machine.search)
  }

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

    records.setMachineData(prev => ({...prev, actionBy: usrs}))

  }, [tempUsers])


  const handleViewData = (data: DowntimeModel) => {
    setViewData(() => data)
    setOpenModal(() => ({state: true, type: "Data"}))
  }

  // .effects
  const handleEdit = (data: DowntimeModel) => {
    setUpdate(true)

    data.iticket = data.iticket.slice(data.iticket.length - 6, data.iticket.length)
    setTempUsers(data.actionBy.split(","))
    records.onClose()
    data.start = dayjs(data.start)
    data.end = dayjs(data.end)
    records.setMachineData(data)

    setOpenModal({state: true, type: undefined})
  }


  const handleMachines = () => {
    machine.getDowntimeData(1, machine.search)
    machine.getMachineList()

    machine.updateTabcount("")
  }

  useEffect(() => {
    handleMachines()

    getUsers()

    return () => {
      setLocal("maximize", JSON.stringify(maximize))
    }
  }, [])

  return (
    <div className={`overflow-hidden ${maximize && "absolute top-0 left-0 w-full h-screen"}" bg-white h-full w-full`}>
      <PageHeader 
        headers={DATA_HEADERS} 
        maximize={maximize} 
        setMaximize={setMaximize} 
        setOpenModal={setOpenModal}
        machine={machine}
      />

      <div className="w-full h-[95%] overflow-auto pb-4">
        <div className="w-full flex items-end justify-between pe-8">
          <Pagination page={machine.pages.current} className="pt-2" size="small" count={machine.pages.tabs} onChange={(_, value: number) => pageControl(value)}/>
        </div>

        <div className={`body mx-8 flex flex-col justify-start items-start ${!machine.downtimes && "h-full"}`}>
          {machine.downtimes ? <DataTable 
            downtimes={machine.downtimes}
            headers={DATA_HEADERS} 
            handleViewData={handleViewData} 
          /> : <div className="h-full w-full flex justify-center items-center">Empty Records</div>}
        </div>
        <Pagination page={machine.pages.current} className="pt-2" size="small" count={machine.pages.tabs} onChange={(_, value: number) => pageControl(value)}/>
      </div>

      {openModal.state && openModal.type && 
        <div className="w-full h-full flex justify-center bg-black/20 items-center absolute top-0 left-0">
          <div className="w-auto h-[80%] rounded-xl bg-white shadow-sm shadow-black/20"> 
          {openModal.type == "Filter" ? 
            <Modals type={openModal.type} close={records.onClose} users={users} edit={handleEdit}/>
            :
            viewData && <Modals 
                    type={openModal.type} 
                    close={records.onClose} 
                    edit={handleEdit} 
                    machineData={viewData ? viewData : records.dummyData} 
                  />
          }
          </div>
        </div>
      }

      <NewRecord 
        openModal={openModal}
        machine={machine}
        users={users}
        update={update}
        record={records}
      />

    </div>
  )
};
export default DowntimeClient;
