import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Gallery from '../gallery'
import Blog from '../blog'
import Account from '../account'

const MainPage = () => {
    return (
        <div className='container'>
            <Routes>
                <Route index element={<Gallery />}>
                </Route>
                <Route path='/blog' element={<Blog />}>
                </Route>
                <Route path='/account' element={<Account />}>
                </Route>
            </Routes>
        </div>
    )
}

export default MainPage