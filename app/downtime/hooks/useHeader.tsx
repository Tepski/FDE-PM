import { useState } from "react"
import { MenuProps } from "antd"

export const useHeader = () => {

  const [select, setSelect] = useState<string>()

  const getItems = (data: string[][]): MenuProps['items'] => {
    let items: MenuProps['items']

    items = data.map((header, _) => (
      {
        key: header[1],
        label: (<p className="text-gray-600" onClick={() => setSelect(() => header[0])}>{header[0]}</p>),
      }
    ))

    return items
  }

  return {
    getItems,
    select,
    setSelect,
  }
}

