import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/pages/Dashboard';
import { ChakraProvider } from '@chakra-ui/react'
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS={true}>
      <Router>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
