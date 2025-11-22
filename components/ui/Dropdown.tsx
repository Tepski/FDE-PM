"use client"

// Khuzomi De Ocampo

import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

interface DropDownProps {
  title: string,
  data: string[],
  selectedData: SelectedData,
  setSelectedData: React.Dispatch<React.SetStateAction<SelectedData | undefined>>,
}

export default function Dropdown({title, data, selectedData, setSelectedData}: DropDownProps) {
  const [open, setOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState<string>(title)
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSelectData = (select: string): void => {
    switch (title) {
      case ("Area"):
        setSelectedData(prev => ({...prev, area: select}))
        setSelectedData(prev => ({...prev, data: undefined, code: undefined}))
      case ("Machine"):
        setSelectedData(prev => ({...prev, data: select}))
      case ("Code"):
        setSelectedData(prev => ({...prev, code: select}))
      default:
        setSelectedTitle(select)
    }

    setOpen(false)
  }

  useEffect(() => {
    if (title != "Area") {
      setSelectedTitle(title)
    }
  }, [selectedData?.area])

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="relative flex w-full" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 text-gray-500 border-1 border-gray-40 w-full rounded-md flex justify-between gap-4 truncate max-w-96"
      >
        {selectedTitle}
        <span><ChevronDownIcon size={"24px"} /></span>
      </button>

      {open && (
        <div 
          className="absolute bg-white text-gray-500 border border-gray-200 rounded-md shadow-lg max-h-100 overflow-y-auto" 
          style={{ 
            marginTop: `${menuRef.current?.clientHeight && menuRef.current?.clientHeight + 4}px`,
            width: `${menuRef.current?.clientWidth && menuRef.current?.clientWidth + 4}px`
          }}
        >
          {
            data.map((d: string, index: number) => {
              return (    
                <button 
                  key={index.toString()}
                  onClick={() => handleSelectData(d)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {d}
                </button>
              )
            })
          }
       </div>
      )}
    </div>
  );
};
