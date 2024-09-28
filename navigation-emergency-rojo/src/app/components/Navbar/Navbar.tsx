import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';
import boatIcon from '../../assets/boat-icon.png';
import toggle_light from '../../assets/night.png';
import toggle_dark from '../../assets/day.png';

interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({ theme, setTheme }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const location = useLocation();

  const toggleMode = () => {
    //POR FAVOR
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`navbar ${theme}`}>
      <div className="navbar-container">
        <div className="left-content">
          <a
            className="boat-icon-link"
            href="https://www.flaticon.es/iconos-gratis/embarcacion"
            title="Embarcacion iconos creados por Freepik - Flaticon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={boatIcon} alt="boat icon" className="boat-icon" />
          </a>
          <h5>Emergencias Alta Mar</h5>
        </div>

        <div className="center-content">
          <ul className="nav-links">
            <li className={isActive('/') ? 'active' : ''}>
              <Link to="/">Inicio</Link>
            </li>
            <li className={isActive('/registrar') ? 'active' : ''}>
              <span onClick={toggleSubMenu} className="menu-item">
                Embarcacion
              </span>
              {showSubMenu && (
                <ul className="submenu">
                  <li>
                    <Link to="/registrar">Registrar</Link>
                  </li>
                  <li>
                    <Link to="/table-embarcacion">Ver</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={isActive('/reporte') ? 'active' : ''}>
              <span onClick={toggleSubMenu} className="menu-item">
                Reporte
              </span>
              {showSubMenu && (
                <ul className="submenu">
                  <li>
                    <Link to="/reporte">Registrar</Link>
                  </li>
                  <li>
                    <Link to="/table-reporte">Ver</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={isActive('/alerta') ? 'active' : ''}>
              <span onClick={toggleSubMenu} className="menu-item">
                Alerta
              </span>
              {showSubMenu && (
                <ul className="submenu">
                  <li>
                    <Link to="/alerta">Registrar</Link>
                  </li>
                  <li>
                    <Link to="/table-alerta">Ver</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <img
          onClick={toggleMode}
          src={theme === 'light' ? toggle_light : toggle_dark}
          alt="toggle theme"
          className="toggle-icon"
        />
      </div>
    </div>
  );
};

export default Navbar;