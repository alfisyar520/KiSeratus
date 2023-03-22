import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from '@chakra-ui/react'

import './assets/styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
