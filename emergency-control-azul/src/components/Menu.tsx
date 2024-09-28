import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';

//Imports (Temporales)
import HeartRateIcon from '../assets/icons/heart-rate.svg'
import GearIcon from '../assets/icons/gear.svg'
import ProfilePicture from '../assets/images/placeholder.png'

const navLinks = [
    { displayName: 'Dashboard', link: '/' },
    { displayName: 'Mapa', link: '/mapa' },
    { displayName: 'Reportes', link: '/reporte-incendio' },
    { displayName: 'Estadísticas', link: '/estadisticas' },
    { displayName: 'Departamentos', link: '/departamentos' },
];

interface MenuProps {
  className?: string;
}

const Menu: React.FC<MenuProps> = ({ className }) => {
    return (
        <nav className={`main-menu navbar navbar-expand-lg ${className}`}>
            <ul className="navbar-nav">
                {navLinks.map((navItem, index) => (
                    <li className="nav-item" key={index}>
                        <NavLink className="nav-link" to={navItem.link}>
                            {navItem.displayName}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="navbar-icons">
                <Button className="navbar-button p-1 rounded-circle">
                    <img src={HeartRateIcon} alt="Heart Rate Icon" />
                </Button>
                <Button className="navbar-button p-1 rounded-circle">
                    <img src={GearIcon} alt="Gear Icon" />
                </Button>
            </div>
            <div className="navbar-profile">
                <img alt="Foto Perfil" src={ProfilePicture} />
            </div>
        </nav>
    );
}

export default Menu;
