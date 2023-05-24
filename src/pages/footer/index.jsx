import React from 'react'
import './styles.scss'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container footer__container">
                <div className="footer__nav">
                    <Link to="/" className="footer__link">Gallery</Link>
                    <Link to="/blog" className="footer__link">Blog</Link>
                    <Link to="/account" className="footer__link">Account</Link>
                </div>
                <div className="footer__info">2023 © DISKPISK ™</div>
            </div>
        </footer>
    )
}

export default Footer