import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import Layout from "./components/layout";
import FormConfiguration from "./components/layout/fomrUnik";
import Dashboard from "./pages/dashboard";
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
        <Route path="/form-unik" element={<Layout />}>
          <Route index element={<FormConfiguration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
