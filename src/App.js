import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Jadwal from "./pages/jadwal_4.0";

function App() {

  return (
    <ChakraProvider>
      <Jadwal/>
    </ChakraProvider>
  );
}



export default App;
