import React, { useState } from 'react'
import { UnsplashAPI } from '../../api/Unsplash'
import PhotoComp from './PhotoComp'
import './styles.scss'
import Loader from '../../components/Loading';
import { useSelector } from 'react-redux';
import { selectSearch } from '../../store/search/search.selector';
import CreatePost from '../../components/modal/CreatePost';
import { Link } from 'react-router-dom';

const Gallery = () => {
    const dataAPI = UnsplashAPI();
    const search = useSelector(selectSearch)
    console.log(dataAPI)

    const dwnld = `Size: {1}x{2}`

    const [isModalOpen, setModalOpen] = useState(false);
    const [isPostModalOpen, setPostModalOpen] = useState(false);

    const openModal = () => {
        console.log('open')
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `/image/{photo.id}`)
    };
    const openPostModal = () => {
        setPostModalOpen(true);
        document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
        setModalOpen(false);
        document.body.style.overflow = '';
        window.history.pushState(null, '', '/')
    };

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
                                <li className={`gallery__item`} key={photo.id}>
                                    <div className="gallery__item-view">
                                        {isModalOpen && (
                                            <div className="bg-modal" onClick={closeModal}>
                                                <div className="modal">
                                                    <img
                                                        onClick={closeModal}
                                                        src={photo.urls.regular}
                                                        alt="img"
                                                        title='CLICK ON IMAGE TO ZOOM OUT'
                                                        className="modal__img" />
                                                    <Link className="modal__btns modal__post"
                                                        to={`create_post/${photo.id}`}
                                                        onClick={openPostModal}>
                                                        <p>Create Post</p>
                                                    </Link>
                                                    <a
                                                        href={photo.links}
                                                        className="modal__btns modal__download"
                                                        title={photo.dwnld}
                                                    >Down⌊✓⌋load</a>
                                                    <a
                                                        href={`https://unsplash.com/@${photo.username}`}
                                                        target='_blank'
                                                        title="Author"
                                                        rel="noreferrer"
                                                        className="modal__btns modal__credit">{photo.user}
                                                    </a>
                                                    <span className='modal__description'>{photo.description}</span>
                                                </div>
                                            </div >
                                        )}
                                        {isPostModalOpen && (
                                            <CreatePost setPost={setPostModalOpen} />
                                        )}
                                        <img
                                            src={photo.urls.regular}
                                            onClick={openModal}
                                            alt="img"
                                            className="gallery__img"
                                            title="CLICK ON IMAGE TO ZOOM IN"
                                        />
                                        <Link className="gallery__btns gallery__post"
                                            to={`create_post/${photo.id}`}
                                            onClick={openPostModal}>
                                            <p>Create Post</p>
                                        </Link>
                                        <a
                                            href='links.download'
                                            className="gallery__btns gallery__download"
                                            title='dwnld'
                                        >Down⌊✓⌋load</a>
                                        <a
                                            href={`https://unsplash.com/@${photo.user.username}`}
                                            target='_blank'
                                            title="Author"
                                            rel="noreferrer"
                                            className="gallery__btns gallery__credit">{photo.user.name}
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </>
                    )}
                </ul>
            </div>
        );
    }
};

export default Gallery;
