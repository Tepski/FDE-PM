import { DowntimeModel } from "../models";

interface DataTableProps {
  downtimes: DowntimeModel[] | undefined,
  headers: string[][],
  handleViewData: (i: DowntimeModel) => void;
}

export const DataTable = ({
  downtimes,
  headers,
  handleViewData,
}: DataTableProps) => {

  return (
    <table className="w-full border border-gray-200 text-xs mt-2">
      <thead className="bg-gray-100 select-none sticky top-0">
        <tr className=""  >
          {headers.map((header, index) => {
              return (
                <th 
                  className={`px-4 py-2 w-[${String(1/headers.length)}]  hover:bg-gray-200 hover:cursor-pointer 
                    border-b border-r border-[rgb(229,229,229)] font-semibold text-gray-600`} 
                  key={index.toString()}
                >
                {header[0]}
                </th>
              )
          })}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {downtimes?.map((dt, index) => {
            return (
              <tr 
                key={index.toString()} 
                className={`text-center text-xs text-gray-500 hover:bg-gray-200 hover:cursor-pointer active:bg-gray-300 ${index % 2 != 0 && "bg-blue-50" }`}
                onClick={() => handleViewData(dt)}
              >
                <td className="py-2 border-x border-x-gray-200 overflow-hidden font-semibold text-[10px]">{dt.date?.toString().split("T")[0]}</td> 
                <td className="py-2 border-x border-x-gray-200 overflow-hidden font-semibold text-[10px] z-30">
                  <a 
                    onClick={(e) => e.stopPropagation()}
                    href={dt.iticket}
                    target="_blank"
                    rel="noopener noreferer"
                    className="text-blue-800 underline"
                  >
                    {dt.iticket.substring(dt.iticket.length - 6)}
                  </a>
                </td>
                <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.machine}</td> 
                <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.area}</td> 
                <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.partNo != "" ? dt.partNo : "n/a"}</td> 
                <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.abnormality}</td> 
                <td className={`py-2 border-x border-x-gray-200 overflow-hidden ${dt.type.includes("Rep") ? "text-red-400" : "text-blue-800"}`}>{dt.type}</td> 
                <td className="py-2 border-x border-x-gray-200 truncate max-w-[200px] overflow-hidden text-start px-2">{dt.action}</td> 
                <td className={`py-2 border-x border-x-gray-200 overflow-hidden font-bold ${dt.duration && dt.duration >= 60 && "text-red-400"}`}>{dt.duration + " min."}</td> 
                <td className="py-2 border-x border-x-gray-200 overflow-hidden">{dt.actionBy}</td> 
              </tr> 
            )
        })}
      </tbody>
    </table>
  )
}
