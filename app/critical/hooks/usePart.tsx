import { useState, useEffect } from "react";
import { getKeyParts } from "../utils/keyPartApi";
import { Part, DataI } from "../models";  

const usePart = () => {
  const [part, setPart] = useState<DataI | undefined>()
  const [active, setActive] = useState<Part[] | undefined>()

  useEffect(() => {
    (async () => {
      getKeyParts().then(data => {
        setPart(data)
      })
    })()
  }, [])

  useEffect(() => {
    if (part) {
      const arrayObj = Object.entries(part)
      console.log("Array:", arrayObj)
    }
  }, [part])

  useEffect(() => {
    active && console.log("Selected:", active)
  }, [active])

  return {
    part, active, setPart, setActive
  }
}

export default usePart;
