import React from 'react'
import { UnsplashImage } from '../../api/Unsplash'
import { useParams } from 'react-router-dom'

const GalleryImage = () => {
    const params = useParams()
    const imageId = params['*']
    console.log(imageId)
    const data = UnsplashImage(imageId)
    console.log(data)
    if (data) {
        return (
            <div>
                <span>{data.response.id}</span>
                <img src={data.response.urls.regular} alt="" />
                <span>{data.response.alt_description}</span>
            </div>
        )
    } else {
        return (<>dicksdsa</>)
    }
}

export default GalleryImage