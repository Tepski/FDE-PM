"use client"

import { hookPartModel } from "./hooks/hookModels"

interface ClientProps {
  parts: hookPartModel
}

const CriticalClient = ({ parts }: ClientProps) => {

  return (
    <div 
      className="w-full h-full flex flex-col p-4"
      style={{
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <div className="w-full h-full flex flex-row flex-wrap justify-center gap-2 p-2 pt-0">
        {
          parts.part && Object.entries(parts.part).map(([area, machine]) => (
            <div key={area} className="bg-[rgb(240,240,240)] rounded-md shadow-sm shadow-black/20 w-full 
              flex flex-col p-4 items-center justify-start border-1 border-black">
              <div className="w-full py-2 font-bold text-gray-400 text-lg" style={{fontFamily: '"Verdana", sans-serif'}}>
                <p>{area}</p>
              </div>
              <div className="flex flex-wrap justify-start items-start gap-1 w-full">
                {machine && Object.entries(machine).map(([keypart, mach]) => (
                  <div 
                    onClick={() => parts.setActive(parts.active == mach ? undefined : mach)} 
                    key={keypart + mach} 
                    className={`w-full h-auto bg-white p-2 rounded-sm text-xs flex flex-col hover:cursor-pointer ${parts.active == mach && "border-2 border-gray-700"}`}
                  >
                    <div className="w-full flex justify-between">
                      <p>{keypart}</p>

                      {false && 
                        <div className="flex gap-1">
                          <p className="p-1 rounded-sm bg-red-200">1</p>
                          <p className="p-1 rounded-sm bg-yellow-200">2</p>
                          <p className="p-1 rounded-sm bg-green-300"  >3</p>
                        </div>
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        }
        <div className="w-full py-3 flex items-end text-gray-300 justify-end">
          <p className="text-white">Nicera Philippines, inc.</p>
        </div>
      </div>
    </div>
  )
  
  // return (
  //   <div className="flex flex-col w-full h-full justify-center overflow-auto">
  //     <PageHeader />
  //
  //     <div className="flex w-full h-full bg-red-300 p-4center center center ">
  //       {part && Object.fromEntries(part).map(([area, machine]) => {
  //         <p>{area}</p>
  //       })}
  //     </div>
  //   </div>
  // )
}

export default CriticalClient;
