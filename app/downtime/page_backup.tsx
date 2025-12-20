"use client";

import { PlusIcon } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useState, useEffect } from "react";
import downtimeForm from './components';
    
const downtime = () => {

  const [showModal, setShowModal] = useState<boolean>(false);
  const [machines, setMachines] = useState<MachineData>();
  const [selected, setSelected] = useState<SelectedData>();

  const formParam: FormI  = {
    machineData: machines,
    setShowModal: setShowModal,
    selectedData: selected,
    setSelectedData: setSelected
  };

  const getArea = (id: number): string | undefined => {
    return machines?.area.filter((area) => area.area_id  == id)[0].area
  }

  const fetchMachines = async () => {
    const res = await fetch("/api/server")

    return res.json()

  };

  useEffect(() => {
    fetchMachines().then(res => {
      const resData: MachineData  = {
        data: res.data,
        area: res.area,
        code: res.code
      }
      setMachines(() => resData)
    })
  }, [])
  
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-between items-center px-4 h-[5%] w-full border-b-1 border-b-[rgb(229,229,229)]">
        <p className="font-bold text-xl">Machine Downtime Monitoring</p>
        <p className="px-4 py-2 rounded-full bg-black text-white text-sm flex items-center gap-4 hover:cursor-pointer"
          onClick={() => setShowModal((prev) => !prev)}
        >
          <span><PlusIcon size={14} /></span>
          {"Add New"}
        </p>
      </div>
      <div className="w-full h-full p-4 flex flex-col overflow-y-auto">
        <p>{selected?.area ? selected.area : "This is the page for the Machine Downtime"}</p>
      </div>
      {showModal && <Modal children={downtimeForm(formParam)} />}
    </div>
  )
};

export default downtime;
