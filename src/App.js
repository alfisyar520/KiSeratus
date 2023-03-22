import * as React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

import SilsilahKeluarga from "./pages/silsilah_keluarga";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SilsilahKeluarga />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
