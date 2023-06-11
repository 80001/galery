import { useDispatch, useSelector } from "react-redux"
import { selectClassChange } from "../../store/search/search.selector"
import { setCreatePostModal, setPhoto, setPhotoId, setZoomModal } from "../../store/modals/modals.action"
import Loader from "../../components/Loading"
import { useState } from "react"

const PhotoComp = ({ photo }) => {
    const dispatch = useDispatch()
    const classChange = useSelector(selectClassChange)
    const { user, urls, width, height, links, id } = photo
    const dwnld = `Size: ${width}x${height}`

    const openModal = () => {
        dispatch(setPhotoId(id))
        dispatch(setPhoto(photo))
        dispatch(setZoomModal(true))
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `${window.location.pathname}/${photo.id}`)
    };
    const openPostModal = () => {
        dispatch(setPhoto(photo.urls.full))
        dispatch(setCreatePostModal(true))
        document.body.style.overflow = 'hidden'
        window.history.pushState(null, '', `${window.location.pathname}/create_post/${photo.id}`)
    };
    const [isLoad, setIsLoad] = useState(true)
    const handleLoadImage = () => {
        setIsLoad(false)
    }
    return (
        <li className={`gallery__item${classChange}`}
            onLoad={handleLoadImage}>
            {isLoad && <Loader />}
            <div className="gallery__item-view">
                <img
                    src={urls.regular}
                    onClick={openModal}
                    alt="img"
                    className="gallery__img"
                    title="CLICK ON IMAGE TO ZOOM IN"
                />
                <div className="gallery__btns gallery__post"
                    to={`create_post/${photo.id}`}
                    onClick={openPostModal}>
                    <p>Create Post</p>
                </div>
                <a
                    href={links.download}
                    className="gallery__btns gallery__download"
                    title={dwnld}
                >Down⌊✓⌋load</a>
                <a
                    href={`https://unsplash.com/@${user.username}`}
                    target='_blank'
                    title="Author"
                    rel="noreferrer"
                    className="gallery__btns gallery__credit">{user.name}
                </a>
            </div>
        </li>
    )
}
export default PhotoComp