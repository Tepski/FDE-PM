"use client"

import { useEffect } from "react";

const summary = () => {

  const fetchData = async () => {
    await fetch("http://localhost:8800/api/users")
    .then(data => data.json())
    .then(jsonData => {console.log(jsonData)})
  }

  useEffect(() => {
    fetchData()
  }, [])

  return(
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <div className="w-full py-2 bg-red-400/40 flex items-center justify-center">
        Navigational Barrier
      </div>

      <div className="h-full w-full flex justify-center bg-[rgb(240,240,240)] items-center rounded-md shadow shadow-black/30">
        <p className="text-7xl font-bold">1</p>
      </div>

      <div className="h-full w-full flex justify-center bg-[rgb(240,240,240)] items-center rounded-md shadow shadow-black/30">
        <p className="text-7xl font-bold">2</p>
      </div>

      <div className="h-full w-full flex justify-center bg-[rgb(240,240,240)] items-center rounded-md shadow shadow-black/30">
        <p className="text-7xl font-bold">3</p>
      </div>
    </div>
  )
};

export default summary;
