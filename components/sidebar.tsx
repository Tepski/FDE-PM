"use client";

import { usePathname } from "next/navigation";
import { items, utils } from "@/utils/items";
import Link from "next/link";

const sidebar = () =>  {

  const pathName = usePathname()

  const selected_style = "bg-white -me-6 rounded-s-full"

  return(
    <div className="flex flex-col h-full w-full gap-4">
      <p className="text-sm text-gray-500">Home</p>
      {items.map((item, index) => {
        return (
          <div key={index.toString()} className="relative">
          <Link href={item.path}
            className={`flex gap-4 items-center  hover:cursor-pointer 
            ${pathName != item.path && "hover:bg-gray-200"} p-2 rounded-sm ${item.path == pathName && selected_style}`} 
          >
            {<item.icon size={16} />}
            <p className="text-sm">{item.title}</p>
          </Link>

          {!item.active && <div className="w-full h-full absolute top-0 left-0" />}
          </div>
        )
      })}
      <p className="text-sm text-gray-500 pt-4">Utilities</p>
      {utils.map((item, index) => {
        return (
          <a href={item.path}
            target="_blank"
            rel="noopener noreferer"
            className={`flex gap-4 items-center hover:cursor-pointer 
            ${pathName != item.path && "hover:bg-gray-200"} p-2 rounded-sm ${item.path == pathName && selected_style}`} 
            key={index.toString()}>
            {<item.icon size={16} />}
            <p className="text-sm">{item.title}</p>
          </a>
        )
      })}
    </div>
  )
};

export default sidebar;
