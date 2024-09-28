import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Embarcacion from './components/Embarcacion/Embarcacion';
import Table from './components/Tables/dataTable';
import Alerta from './components/Alerta/Alerta';
import Reporte from './components/Reporte/Reporte';
import TableReporte from './components/Tables/tableReporte';
import TableAlerta from './components/Tables/tableAlerta';
import EditEmbarcacion from './components/Tables/EditEmbarcacion';
import EditReporte from './components/Tables/EditReporte';

const App: React.FC = () => {
  const current_theme = localStorage.getItem('current_theme');
  const [theme, setTheme] = useState<string>(
    current_theme ? current_theme : 'light'
  );

  useEffect(() => {
    localStorage.setItem('current_theme', theme);
  }, [theme]);

  return (
    <Router>
      <div
        className={`app-container ${theme}`}
        style={{ minHeight: '100vh', margin: 0, padding: 0 }}
      >
        <div>
          <Navbar theme={theme} setTheme={setTheme} />
          <Routes>
            <Route
              path="/"
              element={
                <div
                  className="home"
                  style={{ minHeight: 'calc(100vh - 70px)' }}
                />
              }
            />
            <Route path="/registrar" element={<Embarcacion />} />
            <Route path="/table" element={<Table />} />
            <Route path="/alerta" element={<Alerta />} />
            <Route path="/reporte" element={<Reporte />} />
            <Route path="/table-embarcacion" element={<Table />} />
            <Route path="/table-reporte" element={<TableReporte />} />
            <Route path="/table-alerta" element={<TableAlerta />} />
            <Route path="/edit/:id" element={<EditEmbarcacion />} />
            <Route path="/editreporte/:id" element={<EditReporte />} />
          </Routes>
        </div>
        <footer className="footer">
          © 2024 Equipo Rojo. Todos los derechos reservados
        </footer>
      </div>
    </Router>
  );
};

export default App;