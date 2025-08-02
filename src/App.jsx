// import Ingresos from "./components/ingresos-egresos/Ingresos";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PerfilPage from "./pages/PerfilPage";
import AgregarPage from "./pages/AgregarPage";
import LoginPage from "./pages/LoginPage";
import MainLayout from "./layouts/MainLayout";
import RegistroDetallePage from "./pages/RegistroDetallePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="perfil" element={<PerfilPage />} />
          <Route path="agregar" element={<AgregarPage />} />
          <Route path="registro/:id" element={<RegistroDetallePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
