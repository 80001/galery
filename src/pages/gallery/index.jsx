import React from 'react'
import { UnsplashAPI } from '../../api/Unsplash'
import PhotoComp from './PhotoComp'
import './styles.scss'

const Gallery = () => {
    const dataAPI = UnsplashAPI();
    console.log(dataAPI)

    if (dataAPI.results.length === 0) {
        return (
            <div className='gallery'>
                <h2 className="gallery__title">Ask something else, beach!!!</h2>
            </div>
        );
    } else if (dataAPI.errors) {
        return (
            <div className='gallery'>
                <div>{dataAPI.errors[0]}</div>
                <h2 className="gallery__title">PS: Make sure to set your access token!</h2>
            </div>
        );
    } else {
        return (
            <div className="galery">
                <h2 className="galery__title">{'You`re images'}</h2>
                <div className="galery__utils">
                    {/* <ViewChanger />
                    <Pages lastPage={data.total_pages} /> */}
                </div>
                <ul className={`galery__container`}>
                    {(
                        <>
                            {dataAPI.results.map(photo => (
                                <PhotoComp key={photo.id} photo={photo} />
                            ))}
                        </>
                    )}
                </ul>
            </div>
        );
    }
};

export default Gallery;
