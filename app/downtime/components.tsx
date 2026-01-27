"use client"
import { useState } from "react";

const Modals = ({
  type, 
  close, 
  users, 
  filter, 
  machineData
}: ModalI) => {

  const [selected, setSelected] = useState<string[]>([])

  const handleSelect = (name: string) => {
    if (selected.includes(name)) {
      setSelected(() => selected.filter(slc => slc != name))
    } else {
      setSelected((prev) => ([...prev, name]))
    }
  }

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
        <div onClick={close}>
          {machineData && <p>Hello, Made Her Faker</p>}
        </div>
      )
  }
};

export default Modals;
