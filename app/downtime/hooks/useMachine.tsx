import { GetDTWithOffset, GetMachineList, GetSingleDT, PageCount } from "../utils/machineApi"
import { DowntimeModel, MachineObject } from "../models.js";
import { MenuProps } from "antd"
import { useEffect, useState } from "react"

export const useMachines = () => {
  const [machineList, setMachineList] = useState<MachineObject[]>() 
  const [viewData, setViewData] = useState<DowntimeModel | undefined>();
  const [downtimes, setDowntimes] = useState<DowntimeModel[]>();
  const [select, setSelect] = useState<string>("")
  const [search, setSearch] = useState<string>("")
  const [pages, setPages] = useState<{current: number, tabs: number}>({current: 1, tabs: 1})

  const getDowntimeData = async (page: number, value: string) => {
    try {
      const res = await GetDTWithOffset(page, select, value)
      setDowntimes(() => res)
    } catch (e) {
      console.log("Error @ MachineData():", e)
    }
  }

  const getMachineList = async () => {
    try {
      const res = await GetMachineList();
      setMachineList(() => res);
    } catch (e) {

    }
  }

  const updateDowntime = (data: any) => {
    setDowntimes((prev) => ([data, ...prev ?? []]))
  }

  const getSingleMachine = async (
    id: number, 
    setModal: React.Dispatch<React.SetStateAction<{state: boolean, type: "Form" | "Data" | "Filter" | undefined}>>
  ) => {
    try {
      const res = await GetSingleDT(id);   
      setViewData(res);
      setModal({state: true, type: "Data"})
    } catch (e) {
      console.log("Error @ SingleMachine():", e)
    }
  }

  const getItems = (data: string[][]): MenuProps['items'] => {
    let items: MenuProps['items']

    items = data.map((header, _) => (
      {
        key: header[1],
        label: (<p className="text-gray-600" onClick={() => setSelect(() => header[0])}>{header[0]}</p>),
      }
    ))

    return items
  }

  const updateTabcount = async (value: string) => {
    const tabCount = await PageCount(select, value)

    console.log("TAB COUNT UPDATE:", tabCount)
                                                           
    setPages(prev => ({...prev, tabs: tabCount}))
  }

  const handleSearch = (val: string) => {
    setSearch(() => val)
    getDowntimeData(1, val)
    updateTabcount(val)
  }


  useEffect(() => {
    console.log(select)
  }, [select])

  return {
    machineList,
    viewData,
    downtimes,
    select,
    search,
    pages,
    setPages,
    setSelect,
    setSearch,
    getItems,
    getDowntimeData,
    getSingleMachine,
    getMachineList,
    updateDowntime,
    updateTabcount,
    handleSearch,
  }
}
