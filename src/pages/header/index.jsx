import React, { useState } from 'react';
import './styles.scss'
import { Link, Outlet } from 'react-router-dom';
import SearchImage from '../../components/Search';
import Authorization from '../../components/Authorization';

const Header = () => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <header className="header">
            <div className={`container header__container${open ? ' header__container--open' : ''}`}>
                <button hidden="hidden" className={`header__button${open ? ' header__button--open' : ''}`} onClick={handleToggle}>
                    <span className="burger-menu__icon">XXX</span>
                </button>
                <div className="header__left">
                    <div className={`header__logo${open ? ' header__logo--open' : ''} header__shrink`}>
                        <Link to='/' className="header__logo-title">
                            Gallery
                        </Link>
                    </div>
                    <SearchImage />
                </div>
                <div className="header__right">
                    <ul className={`header__links-wrap${open ? ' header__links-wrap--open' : ''}`}>
                        <li className="header__links">
                            <Authorization />
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
            </div>
            <Outlet />
        </header>
    )
}

export default Header