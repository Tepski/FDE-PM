"use client";

import { PlusIcon } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { useState } from "react";

const downtimeForm = (setShowModal: React.Dispatch<React.SetStateAction<boolean>>) => {
  return (
    <div className='w-full h-full flex'>
      <div className='w-full flex place-self-end justify-end items-center gap-2'>
        <div onClick={() => setShowModal(false)} className='px-4 py-1 text-center items-center border-1 border-black rounded-full'>Close</div>
        <div onClick={() => setShowModal(false)} className='bg-black text-white px-4 py-1 rounded-full items-center'>Confirm</div>
      </div>
    </div> 
  )
};

const downtime = () => {

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center px-4 h-[5%] w-full border-b-1 border-b-[rgb(229,229,229)]">
        <p className="font-bold text-xl">Machine Downtime Monitoring</p>
        <p className="px-4 py-1 rounded-full bg-black text-white text-sm flex items-center gap-4 hover:cursor-pointer"
          onClick={() => setShowModal((prev) => !prev)}
        >

          <span><PlusIcon size={14} /></span>Add New
        </p>
      </div>
      <div className="p-4 relative">
        <h1>Downtime Page</h1>
      </div>
      {showModal && <Modal children={downtimeForm(setShowModal)} />}
    </div>
  )
};

export default downtime;
