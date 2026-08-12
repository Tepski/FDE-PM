"use client"

import { useRef, useState } from "react";

const Dashboard = () => {

  const container = useRef<HTMLDivElement | null>(null)
  const [enter, setEnter] = useState<boolean>(false)

  const sampleData = {
    "Done": 12,
    "OnGoing": 11,
    "Pending": 8,
    "Cancelled": 1,
    "Delayed": 2,
  }

  const colors = [
      "bg-green-400/60", 
      "bg-blue-400/60", 
      "bg-yellow-400/60", 
      "bg-orange-400/60", 
      "bg-red-400/60"
  ]

  return (
    <div 
      onMouseEnter={() => {setEnter(() => true)}}
      onMouseLeave={() => {setEnter(() => false)}}
      ref={container}
      className="absolute left-2 bottom-2 p-2 flex flex-row gap-2 rounded-full shadow-black/40 
        shadow-sm bg-[rgb(240,240,240)] border-1 border-[rgb(229,229,229)]"
    >
      {Object.entries(sampleData).map(([status, count], i) => (
        <div 
          key={status} 
          className={`w-24 ${colors[i]} border-1 border-${colors[i]}-500 
            hover:bg-gray-400 hover:cursor-pointer `}
          style={{
            borderTopLeftRadius: i == 0 ? "40px" : 0,
            borderBottomLeftRadius: i == 0 ? "40px" : 0,
            borderTopRightRadius: i == 4 ? "40px" : 0,
            borderBottomRightRadius: i == 4 ? "40px" : 0,
          }}
        >
          <p className="w-full flex items-center justify-center 
            font-extrabold text-lg text-gray-600"
          >
            {count}
          </p>
            <p className={`w-full text-xs flex items-center justify-center transition-all ease-in-out
            duration-300 pb-2 text-gray-600 ${enter ? "opacity-100 max-h-12 translate-y-2 pb-2" :
            "opacity-0 max-h-0 -translate-y-2"}`}
            >
              {status}
            </p>
        </div>
      ))}
    </div>
  )
};

export default Dashboard;
