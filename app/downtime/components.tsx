import DropwDown from "@/components/ui/Dropdown";
import { useEffect } from "react";

const downtimeForm = ({ setShowModal, machineData, selectedData, setSelectedData }: FormI) => {

  const getAreas = (): string[] => {
    const area = machineData?.area?.map((a) => a.area)

    return area
  }

  const getMachines = (): string[] => {
    const area = machineData.area?.filter((a) => a.area == selectedData.area)[0]
    const machines = machineData.data.filter((machine) => machine.area_id.toString() == area.area_id.toString())

    return machines.map((m) => m.name).sort()
  }

  const getCodes = (): string[] => {
    const machine = machineData.data?.filter(d => d.name == selectedData.data)[0];
    const codes = machineData.code.filter((code) => code.data_id.toString() == machine?.data_id.toString());

    return codes.map(c => c.code);
  }

  return (
    <div className='w-full h-full flex flex-col relative'>

      <div className='w-full h-full flex'>
        <div className='w-[50%] flex flex-col pe-4 gap-8'>
            <div className='flex flex-col'>
              <label className='text-gray-700'>Machine</label>
              <div className='w-full flex gap-4'>
                <DropwDown title="Area" data={getAreas()} selectedData= {selectedData} setSelectedData={setSelectedData}/>
                <DropwDown title="Machine" data={selectedData?.area ? getMachines() : []} selectedData={selectedData} setSelectedData={setSelectedData} />
                <DropwDown title="Code" data={selectedData?.data ? getCodes() : []} selectedData={selectedData} setSelectedData={setSelectedData}/>
              </div>
            </div> 

            <div className='flex flex-col'>
              <label className='text-gray-700'>Abnormality</label>
              <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md' />
            </div> 

            <div className='flex flex-col'>
              <label className='text-gray-700'>Abnormality</label>
              <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md' />
            </div> 

            <div className='flex flex-col'>
              <label className='text-gray-700'>Abnormality</label>
              <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md' />
            </div> 

            <div className='flex flex-col'>
              <label className='text-gray-700'>Abnormality</label>
              <textarea placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md min-h-[25vh]' />
            </div> 
        </div>

        <div className='w-[50%] flex flex-col pe-4 gap-8'>
            <div className='flex flex-col'>
              <label className='text-gray-700'>Abnormality</label>
              <textarea placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md min-h-[25vh]' />
            </div> 

            <div className='flex flex-col'>
              <label className='text-gray-700'>Machine</label>
              <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md' />
            </div> 

            <div className='flex flex-col'>
              <label className='text-gray-700'>Abnormality</label>
              <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md' />
            </div> 

            <div className='flex flex-col'>
              <label className='text-gray-700'>Abnormality</label>
              <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md' />
            </div> 

            <div className='flex flex-col'>
              <label className='text-gray-700'>Abnormality</label>
              <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md' />
            </div> 
        </div>
      </div>

      <div className='w-full flex justify-end justify-self-end place-self-end gap-4 pt-2 border-t-1 border-t-[rgb(200,200,200)]'>
        <div onClick={() => setShowModal(false)} className='px-4 py-1 text-center items-center border-1 border-black rounded-full'>Close</div>
        <div onClick={() => setShowModal(false)} className='bg-black text-white px-4 py-1 rounded-full items-center'>Confirm</div>
      </div>
    </div> 
  )
};

export default downtimeForm;
