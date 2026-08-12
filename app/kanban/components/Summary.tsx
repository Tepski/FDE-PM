import { ChevronUp } from "lucide-react";

const Summary = () => {

  return (
    <div 
      className="absolute right-2 bottom-2 p-2 w-32 flex flex-row gap-2 border-gray-500 
      border-1 rounded-lg shadow-black/40 shadow-sm items-center justify-center
      hover:cursor-pointer hover:bg-gray-200/30 hover:text-black"
    >
      <p className="text-gray-500 flex items-center justify-center gap-2">Summary<ChevronUp size={18}/></p>
    </div>
  )
};

export default Summary;
