'use client'

import { getDefaultAutoSelectFamily } from "net";
import { useState, useEffect, useRef } from "react";

interface TableProps {
  dim: [string, string],
}

const Table: React.FC<TableProps> = ({dim}: TableProps) => {

  return (
    <div className={`bg-blue-400/40 ${dim[0]} ${dim[1]}`}>
      <p>{dim[0]}:{dim[1]}</p>
    </div>
  )
}

const Projects = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const [viewable, setViewable] = useState<boolean>(false)
  const [dim, setDim] = useState<[string, string]>(["", ""])

  const getDimension = (): [string, string] => {

    const width = container.current?.clientWidth ?? 0 
    const height =container.current?.clientHeight ?? 0  

    return [
      `w-[${Math.floor(width / 3)}px]`, 
      `h-[${Math.floor(height / 3)}px]`]
  }

  useEffect(() => {
    setViewable(true)
    setDim(() => getDimension())
  }, [container.current])

  return viewable && (
    <div 
      className="w-full h-full flex justify-evenly items-center flex-wrap overflow-auto"
      ref={container} 
    >
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
      <Table dim={dim} />
    </div>
  )
}

export default Projects;
