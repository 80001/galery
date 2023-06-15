import React, { useEffect, useState } from 'react'
import { UnsplashImage } from '../../api/Unsplash'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/Loading'
import CreatePostModal from '../../components/modal/CreatePostModal'
import { selectCreatePostModal } from '../../store/modals/modals.selector'
import { setCreatePostModal, setPhoto } from '../../store/modals/modals.action'

const GalleryImage = () => {
    const { id: imageId, create: createPost } = useParams()
    const data = UnsplashImage(imageId)
    const dispatch = useDispatch()
    useEffect(() => {
        if (createPost) dispatch(setCreatePostModal(true))
        // eslint-disable-next-line
    }, [createPost])
    const isPostModalOpen = useSelector(selectCreatePostModal)

    const openPostModal = () => {
        dispatch(setCreatePostModal(true))
        dispatch(setPhoto(data.response))
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `create_post/${imageId}`)
    }
    const [isLoad, setIsLoad] = useState(true)
    const handleLoadImage = () => {
        setIsLoad(false)
    }
    if (data) {
        if (data.type === 'error') {
            return (
                <div className="image-page">
                    <h2 className="image-page__error-code">{data.status}</h2>
                    <h3 className="image-page__error-title">{data.errors[0]}</h3>
                </div>
            )
        } else {
            return (
                <div className='image-page' onLoad={handleLoadImage}>
                    {isLoad && <Loader />}
                    {isPostModalOpen && (
                        <CreatePostModal />
                    )}
                    <img
                        src={data.response.urls.regular}
                        alt="img"
                        className="image-page__img"
                        title="CLICK ON IMAGE TO ZOOM IN"
                    />
                    <div className="image-page__btns image-page__post"
                        onClick={openPostModal}>
                        <p>Create Post</p>
                    </div>
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
                    <span className='image-page__description'>{data.response.description || data.response.alt_description || 'Description`s gone!'}</span>
                </div>
            )
        }
    } else {
        return (
            <div className="image-page">
                <Loader />
            </div>
        )
    }
}

export default GalleryImage