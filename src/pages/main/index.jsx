import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Gallery from '../gallery'
import Blog from '../blog'
import Account from '../account'
import CreatePost from '../../components/modal/CreatePost'
//import ZoomModal from '../../components/modal/ZoomModal'
import GalleryImage from '../gallery/image'

const MainPage = () => {
    let location = useLocation();

    React.useEffect(() => {
        console.log(location)
    }, [location]);
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Gallery />}>
                    <Route path='create_post/:id' element={<CreatePost />} />
                    <Route path='image/:id' component={<GalleryImage />} />
                </Route>
                <Route path='blog' element={<Blog />} />
                <Route path='account' element={<Account />}>
                </Route>
            </Routes>
        </div>
    )
}

export default MainPage