import React from "react"

import { Files, Maximize, Minimize } from "lucide-react";
import { Input, Space, Dropdown } from "antd"
import { MachineHook } from "../hookModels";

interface HeaderProps {
  headers: string[][],
  maximize: boolean,
  machine: MachineHook,
  setMaximize: React.Dispatch<React.SetStateAction<boolean>>,
  setOpenModal: React.Dispatch<React.SetStateAction<{state: boolean, type: "Form" | "Data" | "Filter" | undefined}>>
}

export const PageHeader = ({
  headers,
  maximize,
  machine,
  setMaximize,
  setOpenModal,
}: HeaderProps) => {

  const { getItems, select, getDowntimeData } = machine
  const items = getItems(headers)

  return (
    <div className="w-full h-[5%] border-b-[rgb(229,229,229)] border-b flex items-center justify-between px-4 sticky top-0 bg-white">

      <div className="w-full flex flex-1 justify-start">
        <p className="text-gray-500 leading-12 font-bold" style={{fontFamily: '"Verdana", sans-serif'}}>DAILY DOWNTIME MONITORING</p>
      </div>

      <div className="flex flex-1 justify-center">
        {items && <Space.Compact style={{width: "80%"}}>
          <Space.Addon>
            <Dropdown menu={{items}}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {select == "" ? "Column" : select}
                </Space>
              </a>
            </Dropdown>
          </Space.Addon>
          <Input.Search 
            disabled={select == ""} 
            placeholder="Search Downtime" 
            allowClear 
            onClear={() => machine.setSelect("")}
            onSearch={(val) => machine.handleSearch(val)} 
          />
        </Space.Compact>}
      </div>

      <div className="flex items-center flex-1 justify-end">
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
  )
}
