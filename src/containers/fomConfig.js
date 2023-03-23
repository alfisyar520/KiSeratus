import { Box } from "@chakra-ui/react"
import { useState } from "react"

const PreviewPage = () => {
 const hasil = localStorage.getItem("result")
 const { label, type } = hasil

 console.log("type", label)

  return (
   <>
    <Box>this is chakra review</Box>

    <Box>hewan apa itu</Box>
    <Box>{label}</Box>
   </>
  )
}

export default PreviewPage