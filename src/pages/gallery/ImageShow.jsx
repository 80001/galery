import React from 'react'
import { UnsplashImage } from '../../api/Unsplash'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModal, setOpenPostModal } from '../../store/gallery/gallery.action'
import Loader from '../../components/Loading'
import CreatePost from '../../components/modal/CreatePost'
import { selectOpenPostModal } from '../../store/gallery/gallery.selector'

const GalleryImage = () => {
    const params = useParams()
    const imageId = params['*']
    const data = UnsplashImage(imageId)
    console.log(data)
    const dispatch = useDispatch()
    const isPostModalOpen = useSelector(selectOpenPostModal)

    const openModal = () => {
        debugger
        dispatch(setOpenModal(true))
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `/image/${data.id}`)
    };
    const openPostModal = () => {
        dispatch(setOpenPostModal(true))
        document.body.style.overflow = 'hidden';
    };

    if (data) {
        return (
            <div className='image-page'>
                {isPostModalOpen && (
                    <CreatePost url={data.response.urls.regular} />
                )}
                <img
                    src={data.response.urls.regular}
                    alt="img"
                    className="image-page__img"
                    title="CLICK ON IMAGE TO ZOOM IN"
                />
                <Link className="image-page__btns image-page__post"
                    to={`create_post/${data.response.id}`}
                    onClick={openPostModal}>
                    <p>Create Post</p>
                </Link>
                <a
                    href={data.response.links.download}
                    className="image-page__btns image-page__download"
                    title='dwnld'
                >Down⌊✓⌋load</a>
                <a
                    href={`https://unsplash.com/@${data.response.user.username}`}
                    target='_blank'
                    title="Author"
                    rel="noreferrer"
                    className="image-page__btns image-page__credit">{data.response.user.name}
                </a>
                <span className='modal__description'>{data.response.description}</span>
            </div>
        )
    } else {
        return <Loader />
    }
}

export default GalleryImage