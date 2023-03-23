import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import SilsilahKeluarga from "./pages/silsilah_keluarga";
import FormConfiguration from "./components/layout/fomrUnik";
import Jadwal from "./pages/jadwal_4.0";
import Formula from "./pages/formula";
import Informasi from "./pages/informasi";

import "./assets/styles/global.scss";
import FormCanggih from "./pages/form_canggih";




ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/silsilah-keluarga" element={<SilsilahKeluarga />} />
              <Route path="/form-unik" element={<FormConfiguration />} />
              <Route path="/jadwal" element={<Jadwal />}/>
              <Route path="/formula-generator" element={<Formula />}/>
              <Route path="/informasi" element={<Informasi />}/>
              <Route path="/form-canggih" element={<FormCanggih />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
