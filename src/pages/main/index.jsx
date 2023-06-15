import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Gallery from '../gallery'
import Blog from '../blog'
import Account from '../account'
import GalleryImage from '../gallery/ImageShow'
import FullPost from '../blog/FullPost'

const MainPage = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Gallery />} />
                <Route path='/s/:search/:page' element={<Gallery />} />
                <Route path='/s/:search/:page/:id' element={<GalleryImage />} />
                <Route path='/s/:search/:page/:create/:id' element={<GalleryImage />} />
                <Route path=':blog/*' element={<Blog />} />
                <Route path=':blog/:page' element={<Blog />} />
                <Route path='blog/:page/:id' element={<FullPost />} />
                <Route path='account' element={<Account />} />
                <Route path='account/:auth' element={<Account />} />
            </Routes>
        </div>
    )
}

export default MainPage