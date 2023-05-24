import React, { useState } from 'react';
import './styles.scss'
import { Link, Outlet } from 'react-router-dom';
//import Authorization from '../Authorization';
//import SearchImage from '../Search';

const Header = () => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <header className="header">
            <div className={`header__container${open ? ' header__container--open' : ''}`}>
                <button hidden="hidden" className={`header__button${open ? ' header__button--open' : ''}`} onClick={handleToggle}>
                    <span className="burger-menu__icon">XXX</span>
                </button>
                <div className={`header__logo${open ? ' header__logo--open' : ''} header__shrink`}>
                    <Link to='/' className="header__logo-title">
                        Image Gallery
                    </Link>
                </div>
                {/* <SearchImage /> */}
                <ul className={`header__links-wrap${open ? ' header__links-wrap--open' : ''}`}>
                    <li className="header__links">
                        {/* <Authorization/> */}
                    </li>
                    <li className="header__links">
                        <Link to="/blog" className="header__link header__shrink">
                            BLOG
                        </Link>
                    </li>
                    <li className="header__links">
                        <Link to="/account" className="header__link header__shrink">
                            Account
                        </Link>
                    </li>
                </ul>
            </div>
            <Outlet />
        </header>
    )
}

export default Header