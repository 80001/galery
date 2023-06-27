import React, { useState } from 'react'
import './styles.scss'

const BurgerMenu = ({ open, setOpen }) => {
    const [openMenu, setOpenMenu] = useState(false)

    const setMenu = () => {
        if (open) {
            setOpen(false)
            document.body.style.overflow = '';
        } else {
            setOpen(true)
            document.body.style.overflow = 'hidden';
        }
    }

    return (
        <div onClick={setMenu} aria-label='Open Menu' className={open ? "burger active" : 'burger'}>
            <span className="burger__bar" />
            <span className="burger__bar" />
            <span className="burger__bar" />
        </div>
    )
}

export default BurgerMenu