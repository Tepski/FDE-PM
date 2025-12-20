"use client"

import { useState, useEffect } from "react";
import DTform from "./dtform";
import { Files, RefreshCw } from "lucide-react";
import DowntimeModel from "./models";

const downtime = () => {
  const DATA_HEADERS: string[] = ["Date", "Machine", "Abnormality", "Trouble Type", "Action Done", "Shift", "Duration", "Action By"];

  const [downtimes, setDowntimes] = useState<DowntimeModel[]>();

  const getMachines = async () => {
    await fetch("http://127.0.01:8801/api/dt_records").then(res => {
      return res.json()
    }).then(data => {
      setDowntimes(() => data.data as DowntimeModel[])
    })
  }

  useEffect(() => {
    getMachines()
  }, [])

  const dataTable = () => {
    return (
      <table className="w-full border border-gray-200 text-xs overwflow-auto h-full">
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
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden font-semibold text-[10px]">{dt.date.toString().split("T")[0]}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.machine}</td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.abnormality}</td> 
                  <td className={`py-2 border-x border-x-gray-200 overflow-hidden ${dt.type.includes("REPAIR") ? "text-yellow-800" : "text-blue-800"}`}>{dt.type}</td> 
                  <td className="py-2 border-x border-x-gray-200 truncate max-w-[200px] overflow-hidden text-start px-2">{dt.action}</td> 
                  <td 
                    className="p-2 border-x border-x-gray-200 overflow-hidden"
                  >
                    <p className={`${dt.shift.trim() == "DAYSHIFT" ? "text-yellow-800 border-yellow-800 bg-yellow-300/30" : "text-gray-200 border-gray-800/30 bg-gray-500" } border rounded-sm`}>{dt.shift}</p>
                  </td> 
                  <td className="py-2 border-x border-x-gray-200 overflow-hidden font-bold">{dt.id + " min."}</td> 
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
          <p className="hover:bg-gray-200 hover:cursor-pointer rounded-md ms-2 text-sm py-1 px-2 items-center flex flex-row gap-2 text-gray-600"><span><Files size={18} /></span> NEW RECORD</p>
        </div>
      </div>

      <div className="w-full h-full overflow-auto">
        <div className="body mx-8 pb-20 pt-0 mt-2 h-full">
          {downtimes ? dataTable() : <div className="h-full w-full flex justify-center items-center">Wait, wala pang laman</div>}
        </div>
      </div>

     <div className="modal hidden">
        <DTform />
     </div>
    </div>
  )
};

export default downtime;
