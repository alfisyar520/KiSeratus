import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';
import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import SilsilahKeluarga from "./pages/silsilah_keluarga";
import FormConfiguration from "./components/layout/fomrUnik";

import './assets/styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <Router>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/silsilah-keluarga" element={<SilsilahKeluarga />} />
              <Route path="/form-unik" element={<FormConfiguration />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
