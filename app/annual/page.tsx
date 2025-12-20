"use client"

import { warn } from "console";
import MachineProps from "./models";  
import { useEffect, useState } from "react";

const annual = () => {
  const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const [machines, setMachines] = useState<MachineProps[]>()
  
  const apiUrl = "http://127.0.0.1:8801/api/machines"

  const fetchMachines = async () => {
    await fetch(apiUrl).then(res => {
      if (!res.ok) {
        throw new Error("url not found")
      }

      return res.json()
    }).then(data => {
      setMachines(data.data as MachineProps[])
    })
  }

  useEffect(() => {
    fetchMachines()
  }, [])

  useEffect(() => {
    if (!machines) {
      return
    }
  }, [machines])

  return (
    <div className="h-full w-full p-4 flex flex-wrap">
      {
        months?.map((month, index) => {
          return (
            <div key={index.toString()} className="h-full w-[25%]">{month}</div>
          )
        })
      }
    </div>
  )
};

export default annual;
