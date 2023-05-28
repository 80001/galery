import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Gallery from '../gallery'
import Blog from '../blog'
import Account from '../account'
import CreatePost from '../../components/modal/CreatePost'
import GalleryImage from '../gallery/ImageShow'

const MainPage = () => {
    const location = useLocation()

    React.useEffect(() => {
        console.log(location)
    }, [location])

    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Gallery />}>
                </Route>
                <Route path='image/*' element={<GalleryImage />} />
                <Route path='create_post/:id' element={<CreatePost />} />
                <Route path='blog/*' element={<Blog />} />
                <Route path='account' element={<Account />}>
                </Route>
            </Routes>
        </div>
    )
}

export default MainPage