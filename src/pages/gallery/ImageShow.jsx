import React from 'react'
import { UnsplashImage } from '../../api/Unsplash'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModal, setOpenPostModal } from '../../store/gallery/gallery.action'
import Loader from '../../components/Loading'
import CreatePost from '../../components/modal/CreatePost'
import { selectOpenPostModal } from '../../store/gallery/gallery.selector'

const GalleryImage = (props) => {
    const params = useParams()
    console.log('12', params)
    const imageId = params.id
    const dispatch = useDispatch()
    const setPostModalOpen = (bool) => dispatch(setOpenPostModal(bool))
    if (props.showModal) {
        //window.history.pushState(null, '', `s/${params.search}/${params.page}/${imageId}`)
        //window.history.replaceState(null, '', `s/${params.search}/${params.page}/create_post/${imageId}`)
        //window.history.replaceState(null, '', `create_post/${imageId}`)
        console.log('show')

        setPostModalOpen(true)
    }
    const data = UnsplashImage(imageId)
    console.log(data)
    const isPostModalOpen = useSelector(selectOpenPostModal)
    console.log('aawfa', window.location.pathname)

    const openPostModal = () => {
        dispatch(setOpenPostModal(true))
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `create_post/${imageId}`)
    };

    if (data) {
        return (
            <div className='image-page'>
                {isPostModalOpen && (
                    <CreatePost url={data.response.urls.regular} setPost={setPostModalOpen} />
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
                <span className='modal__description'>{data.response.description || data.response.alt_description || 'Description`s gone!'}</span>
            </div>
        )
    } else {
        return <Loader />
    }
}

export default GalleryImage