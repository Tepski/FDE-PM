'use client';

import CriticalClient from "./criticalClient"
import PageHeader from "./components/PageHeader"; 
import usePart from "./hooks/usePart";

const Critical = () => {

  const part = usePart()

  return (
    <div className="flex w-full h-full flex-col overflow-auto">
      <PageHeader />

      <div className="flex w-full h-[95%]">
        <section className="flex flex-col w-full h-full flex-2 border-r-1 border-r-gray-200">
          <CriticalClient parts={part} />
        </section>

        <section className="flex flex-col w-full h-full flex-1 select-none">
          <div className="flex w-full px-4 py-2 border-b-1 border-gray-300">
            <p style={{fontFamily: '"Verdana", "Sans Serif"'}}>KEY PARTS</p>
          </div>

          {!part.active ?
            <div className="w-full h-full text-gray-400 text-5xl p-4 flex justify-center px-4 items-center font-semibold">
              Please Select Machine on the Left
            </div>
            :
            <div className="w-full h-full flex items-center flex-col p-4 gap-2 overflow-auto">
              {part.active.sort((a, b) => (Number(a.critical_level) - Number(b.critical_level))).map((machine, index) => (
                <div 
                  className="w-full border-green-400 border-2 rounded-md h-40 p-2" 
                  key={index.toString()}  
                >
                  <div className="flex justify-between">
                    <p className="font-bold text-gray-600">{machine.name}</p>
                    <p className="font-light text-gray-400">Current Stock: {machine.current_stock}</p>
                  </div>

                  <div>
                    <p className="text-gray-500 text-md italic">{machine.nrm_number}</p>
                    <p className="text-gray-500 text-md italic">{machine.part_number}</p>
                  </div>
                </div>
              ))
              }

            </div>
          }
        </section>
      </div>
    </div>
  )
}

export default Critical;
