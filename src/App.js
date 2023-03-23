import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/layout";
import Dashboard from "./pages/dashboard";
import Jadwal from "./pages/jadwal_4.0";
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
        <Route path="/jadwal" element={<Layout />}>
          <Route index element={<Jadwal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}



export default App;
