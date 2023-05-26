import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Gallery from '../gallery'
import Blog from '../blog'
import Account from '../account'
import CreatePost from '../../components/modal/CreatePost'
import ZoomModal from '../../components/modal/ZoomModal'

const MainPage = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Gallery />}>
                    <Route path='image/*' element={<Gallery />} />
                </Route>
                <Route path='create_post/*' element={<CreatePost />} />
                <Route path='/blog' element={<Blog />}>
                </Route>
                <Route path='/account' element={<Account />}>
                </Route>
            </Routes>
        </div>
    )
}

export default MainPage