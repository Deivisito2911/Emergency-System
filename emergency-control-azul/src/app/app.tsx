import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardView from '../pages/dashboard';
import ReporteIncendio from '../pages/reporte-incendio';
import MapaView from '../pages/mapaView'
//Vendor Imports (try)
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { sessionValidator } from '@emgencias-udo/lib/shared-react-auth';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!isAuth) sessionValidator().then(() => setIsAuth(true));
  }, [isAuth]);
  return ( isAuth &&
    <Router>
      <Routes>
        <Route path="/" element={<DashboardView title="DashboardView | Emergency Equipo Azul" />} />
        <Route path="/reporte-incendio" element={<ReporteIncendio title="Reporte de Incendio | Emergency Equipo Azul" />} />
        <Route path="/mapa" element={<MapaView title="Mapa | Emergency Equipo Azul" />} />
      </Routes>
    </Router>
  );
}

export default App;
