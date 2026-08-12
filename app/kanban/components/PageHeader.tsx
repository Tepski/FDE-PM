'use client'

import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

const PageHeader = () => {
  const [time, setTime] = useState<Date>()

  let currentDate = new Date();

  useEffect(() => {
    const interval = setInterval(() => {
        let newDate = new Date();

        if (currentDate.toLocaleTimeString() != newDate.toLocaleTimeString()) {
            currentDate = newDate
            setTime(() => currentDate)
        }
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="w-full h-[5%] border-b-[rgb(229,229,229)] border-b flex items-center 
      justify-between px-4 sticky top-0 bg-white"
    >
      <p className="text-gray-600 leading-14 font-bold" style={{fontFamily: '"Verdana", sans-serif'}}>
        PROJECT MANAGEMENT
      </p>

      {time && <div className="flex justify-center items-center font-bold">
        <p>{time.toLocaleTimeString()}</p>
      </div>}

        <p 
          className="hover:bg-gray-200 hover:cursor-pointer rounded-md ms-2 text-sm py-1 px-2 
            items-center flex flex-row gap-2 text-gray-600"
        >
          <span>
            <PlusCircle size={24} />
          </span> 
          NEW PROJECT
        </p>
    </div>
  )
};

export default PageHeader;
