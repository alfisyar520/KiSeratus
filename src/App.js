import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Informasi from "./pages/informasi";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/informasi" element={<Layout />}>
          <Route index element={<Informasi />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
