import React, { useState } from 'react';
import './styles.scss'
import { Link, Outlet } from 'react-router-dom';
import SearchImage from '../../components/Search';
import Authorization from '../../components/Authorization';
import BurgerMenu from '../../components/Burger';
import { isMobile } from 'react-device-detect';

const Header = () => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        if (open) {
            setOpen(!open);
            document.body.style.overflow = '';
        }
    };

    return (
        <header className={`header${open ? ' active' : ''}`}>
            <div className={`header__container${open ? ' active' : ' container'}`}>
                <div className={`header__left${open ? ' active' : ''}`}>
                    <div className="header__logo header__shrink">
                        <Link to='/' className="header__logo-title" onClick={handleToggle}>
                            Gallery☢️
                        </Link>
                    </div>
                    <SearchImage />
                </div>
                <div className={`header__right${open ? ' active' : ''}`}>
                    <ul className='header__links-wrap'>
                        <li className="header__links">
                            <Authorization setOpen={setOpen} />
                        </li>
                        <li className="header__links">
                            <Link to="/blog" className="header__link header__shrink" onClick={handleToggle}>
                                BLOG
                            </Link>
                        </li>
                        <li className="header__links">
                            <Link to="/account" className="header__link header__shrink" onClick={handleToggle}>
                                Account
                            </Link>
                        </li>
                    </ul>
                </div>
                <BurgerMenu open={open} setOpen={setOpen} />
            </div>
            <Outlet />
        </header>
    )
}

export default Header