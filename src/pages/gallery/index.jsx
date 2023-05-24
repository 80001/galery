import React from 'react';
import { UnsplashAPI } from '../../api/Unsplash';

const Gallery = () => {
    const dataAPI = UnsplashAPI();

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
            <div className='gallery'>
                {dataAPI.results.map(photo => (
                    <li key={photo.id}>
                        <div>
                            <img
                                src={photo.urls.regular}
                                alt="img"
                                className="gallery__img"
                            />
                        </div>
                    </li>
                ))}
            </div>
        );
    }
};

export default Gallery;
