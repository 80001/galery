import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Gallery from '../gallery'
import Blog from '../blog'
import Account from '../account'
import { useSelector } from 'react-redux'
import { selectModal } from '../../store/modals/modals.selector'
import Modal from '../../components/modal'

const MainPage = () => {
    const modal = useSelector(selectModal)
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Gallery />} />
                <Route path='/s/:search/:page' element={<Gallery />} />
                <Route path='/s/:search/:page/:id' element={<Gallery />} />
                <Route path='/s/:search/:page/:create/:id' element={<Gallery />} />
                <Route path=':blog/*' element={<Blog />} />
                <Route path=':blog/:page' element={<Blog />} />
                <Route path='blog/:page/:id' element={<Blog />} />
                <Route path='account' element={<Account />} />
                <Route path='account/:auth' element={<Account />} />
            </Routes>
            {modal && <Modal />}
        </div>
    )
}

export default MainPage