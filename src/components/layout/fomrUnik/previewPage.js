import { Box, Input } from "@chakra-ui/react"
import { useEffect, useState } from "react"


export const PreviewPage = () => {
  const hasil = JSON.parse(localStorage.getItem("result"))
  const [number, setnumber] = useState(0)

  const handleChangePlus = () => {
    setnumber(+1)
  }

  useEffect(() => {
    localStorage.removeItem('result')
  }, [])

  return (
    <>
      {hasil?.map((val) => (
        <>
          {val.type === "text" ? (
            <>
              <Box>{val.label}</Box>
              <Box width={"30%"}>
                <Input
                type="text"
                // value={input.label}
                // onChange={(e) => handleLabelChange(index, e.target.value)} />
                />
              </Box>
            </>
          ) : val.type === "date" ? (
            <>
              <Box>{val.label}</Box>
              <Box width={"30%"}>
                <Input
                type="date"
                // value={new Date()}
                // onChange={(e) => handleLabelChange(index, e.target.value)} />
                />
              </Box>
            </>
          ) : val.type === "number" ? (
            <>
              <Box>{val.label}</Box>
              <Box width={"30%"}>
                <Input
                type="number"
                // value={input.label}
                // onChange={(e) => handleLabelChange(index, e.target.value)} />
                />
              </Box>
            </>
          ) : null}
        </>
      ))}
    </>
  )
}