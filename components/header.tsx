import { HexagonIcon } from "lucide-react";

const header = () => {
  return(
    <div className="w-full h-full flex items-center">
      <HexagonIcon size={"40"} color={"rgb(0,150,0)"} />
      <p className="text-xl font-extrabold text-gray-800">UT <span className="text-gray-500 font-medium">PFDE/PM</span></p>
    </div>
  )
};

export default header;
