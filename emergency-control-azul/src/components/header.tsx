import React from 'react'
import Menu from './Menu';
import MenuMobile from './MenuMobile';
import LogoHeader from '../assets/logo/logo-header.png'

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header-container">
                <a href="/" className="navbar-logo"><img src={LogoHeader} /></a>
                <Menu />
                <MenuMobile />
            </div>
        </header>
    );
}

export default Header;