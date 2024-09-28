import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3BottomRightIcon } from '@heroicons/react/24/outline';

const navLinks = [
    { displayName: 'Dashboard', link: '/' },
    { displayName: 'Mapa', link: '/mapa' },
    { displayName: 'Reportes', link: '/reporte-incendio' },
    { displayName: 'Estadísticas', link: '/estadisticas' },
    { displayName: 'Departamentos', link: '/departamentos' },
];

const MenuMobile: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar-mobile">
            <button className="hamburger" onClick={toggleMenu}>
                <Bars3BottomRightIcon className="iconos-tabla"/>
            </button>
            <ul className={`navbar-nav ${isOpen ? 'open' : ''}`}>
                {navLinks.map((navItem, index) => (
                    <li className="nav-item" key={index}>
                        <NavLink className="nav-link" to={navItem.link} onClick={toggleMenu}>
                            {navItem.displayName}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default MenuMobile;