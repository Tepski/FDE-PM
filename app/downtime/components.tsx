"use client"
import { useEffect, useState } from "react";
import { Trash2, PenLine, CircleX } from "lucide-react";
import { DowntimeModel } from "./models";

const Modals = ({
  type, 
  close, 
  users, 
  filter, 
  machineData,
  edit
}: ModalI) => {

  const [selected, setSelected] = useState<string[]>([])
  const [editState, setEditState] = useState<boolean>(false)

  const handleSelect = (name: string) => {
    if (selected.includes(name)) {
      setSelected(() => selected.filter(slc => slc != name))
    } else {
      setSelected((prev) => ([...prev, name]))
    }
  }

  useEffect(() => { console.log(machineData) }, [])

  switch (type) {
    case ("Filter"):
      return (
        <div className="w-full h-full px-8 py-2 flex flex-col justify-start items-start">
          <div className="w-full flex justify-between pb-4">
            <p className="font-semibold">FILTER USER {selected.length > 0 && `(${selected.length})`}</p>
            <p onClick={close}>X</p>
          </div>
          <div className="overflow-y-scroll px-4">
            {users && users.map((usr, ndx) => (
              <p 
                key={ndx.toString()} 
                className={`hover:bg-gray-300 px-2 w-[220px] py-1 ${selected.includes(usr.name) && "bg-gray-300/40 rounded-md"}`} 
                onClick={() => handleSelect(usr.name)}
              >
                {usr.name}
              </p>
            ))}
          </div>

          <button 
            className="w-full text-center bg-blue-400 text-white rounded-xl py-2 my-2" 
            disabled={!selected}
            onClick={() => filter && filter(selected)}
          >Submit</button>
        </div>
      )

    case ("Data"):
      return (
        <div className="p-8 h-full flex flex-col justify-between w-[50vw]">
          <div className="flex w-full flex-col h-full gap-8">
            <p className="w-full flex flex-between bg-black text-white rounded-lg font-semibold p-4">
              <span className="w-full">{machineData?.machine}{"\t"}</span>
              <span className="w-full text-end">ID: {machineData?.id}</span>
            </p>
            <div className="flex w-full justify-between">
              <p className="font-semibold">iTicket:</p> 
              <a href={machineData?.iticket} target="_blank" rel="noreferer noopener" className="text-gray-600 hover:underline hover:text-blue-400 hover:cursor-pointer">{machineData?.iticket}</a>
            </div>
            <div className="flex w-full justify-between ">
              <p className="font-semibold">Part Replaced:</p> 
              <p className="text-gray-600">{machineData?.partNo ? machineData.partNo : "N/A"}</p>
            </div>
            <div className="flex w-full justify-between ">
              <p  className="font-semibold">Abnormality:</p> 
              <p  className="text-gray-600 w-[50%] text-end">{machineData?.abnormality}</p>
            </div>
            <div className="flex w-full justify-between ">
              <p className="font-semibold">Trouble Type</p> 
              <p className="text-gray-600">{machineData?.type}</p>
            </div>
            <div className="flex w-full justify-between ">
              <p className="font-semibold">Action Done:</p> 
              <p className="w-[50%] text-end text-gray-600">{machineData?.action}</p>
            </div>
            <div className="flex w-full justify-between ">
              <p className="font-semibold">Start:</p> 
              <p className="text-green-700">{new Date().toString()}</p>
            </div>
            <div className="flex w-full justify-between ">
              <p className="font-semibold">End:</p> 
              <p className="text-red-700">{new Date().toString()}</p>
            </div>
            <div className="flex w-full justify-between pb-4 border-b border-b-gray-300">
              <p className="font-semibold">Action By</p> 
              <p className="text-gray-600 underline font-semibold">{machineData?.actionBy}</p>
            </div>
          </div>

          <div className="h-8 w-full flex justify-between gap-4 mt-4"> 
            <div className="flex gap-1">
              <p className="hover:cursor-pointer px-8 bg-black rounded-s-xl flex justify-center items-center text-white text-sm font-semibold gap-4">
                Delete
                <span><Trash2 size={18} /></span>
              </p>
              <p onClick={() => {machineData ? edit(machineData) : console.log("Tangina wala pa nga e")}} className="hover:cursor-pointer px-8 bg-black rounded-e-xl flex justify-center items-center text-white text-sm font-semibolda gap-4">
                Edit
                <span><PenLine size={18} /></span>
              </p>
            </div>
            <p 
              className="hover:cursor-pointer px-8 border border-black rounded-xl flex justify-center items-center text-black gap-4"
              onClick={close}
            >
              Close
              <span><CircleX size={18} fontWeight={400} /></span>
            </p>
          </div>

        </div>
      )
  }
};

export default Modals;

