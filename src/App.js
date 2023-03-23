import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Formula from "./pages/formula";
import SilsilahKeluarga from "./pages/silsilah_keluarga";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/silsilah-keluarga" element={<Layout />}>
          <Route index element={<SilsilahKeluarga />} />
        </Route>
        <Route path="/formula-generator" element={<Layout />}>
          <Route index element={<Formula />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
