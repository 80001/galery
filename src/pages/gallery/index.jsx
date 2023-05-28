import React from 'react'
import { UnsplashAPI } from '../../api/Unsplash'
import PhotoComp from './PhotoComp'
import './styles.scss'
import Loader from '../../components/Loading';
import { useSelector } from 'react-redux';
import { selectSearch } from '../../store/search/search.selector';

const Gallery = () => {
    const dataAPI = UnsplashAPI();
    const search = useSelector(selectSearch)
    console.log(dataAPI)
    if (dataAPI.results.length === 0) {
        if (dataAPI.results.total === 0) {
            return (
                <div className='gallery'>
                    <h2 className="gallery__title">Ask something else, beach!!!</h2>
                </div>
            );
        }
        return <Loader />
    } else if (dataAPI.errors) {
        return (
            <div className='gallery'>
                <div>{dataAPI.errors[0]}</div>
                <h2 className="gallery__title">PS: Make sure to set your access token!</h2>
            </div>
        );
    } else {
        return (
            <div className="gallery">
                <h2 className="gallery__title">{search}</h2>
                <div className="gallery__utils">
                    {/* <ViewChanger />
                    <Pages lastPage={data.total_pages} /> */}
                </div>
                <ul className={`gallery__container`}>
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
