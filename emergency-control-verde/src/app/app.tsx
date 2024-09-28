import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Recepcion from '../recepcion';
import Gestion from '../gestion';
import RecepcionFichas from '../recepcion-fichas';
import RecepcionAfectados from '../recepcion-afectados';
import { sessionValidator } from '@emgencias-udo/lib/shared-react-auth';

const App: React.FC = () => {
const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (!isAuth) sessionValidator().then(() => setIsAuth(true));
  }, [isAuth]);
  return ( isAuth &&
    <Router>
      <Routes>
        <Route path="/gestion" element={<Gestion />} />
        <Route path="/" element={<Recepcion/>} />
        <Route path="/recepcion-fichas/:id/edit" element={<RecepcionFichas/>} />
        <Route path="/agregar-afectados/:id" element={<RecepcionAfectados />} />
      </Routes>
    </Router>
  );
}

export default App;
