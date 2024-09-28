import React from 'react';
import { Link } from 'react-router-dom';
import '../../public/style/nav.css';
import exitIcon from '../../public/img/exit.png';
import { redirectToLogin } from '@emgencias-udo/lib/shared-react-auth'; // Ajusta el path según sea necesario

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navdiv">
        <div className="title-nav">
          <Link to="/">EMERGENCIAS</Link>
        </div>
        <ul>
          <li><Link to="/">Recepcion</Link></li>
          <li><Link to="/gestion">Gestion</Link></li>
          <li className='IconLi'>
            <Link to="" onClick={(e) => {
              e.preventDefault(); // Previene la navegación predeterminada
              redirectToLogin();
            }}>
              <img src={exitIcon} alt="Exit icon" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
