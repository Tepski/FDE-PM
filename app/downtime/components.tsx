import DropwDown from "@/components/ui/Dropdown";

interface FormI {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  machineData:  MachineData,
}

const downtimeForm = ({setShowModal, machineData}: FormI) => {
  return (
    <div className='w-full h-full flex flex-col relative'>

      <div className='w-full h-full flex'>
        <div className='w-[50%] flex flex-col pe-4 gap-8'>
            <div className='flex flex-col'>
              <label className='text-gray-700'>Machine</label>
              <div className='w-full flex gap-4'>
                <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md flex-3' />
                <input placeholder='Select Machine' className='border-1 border-gray-400 p-2 rounded-md flex-1' />
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
