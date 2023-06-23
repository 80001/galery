import { useDispatch, useSelector } from "react-redux"
import { selectClassChange } from "../../store/search/search.selector"
import Loader from "../../components/Loading"
import { useState } from "react"
import { openModal } from "../../store/modals/modals.action"
import { Link } from "react-router-dom"

const PhotoComp = ({ photo }) => {
    const dispatch = useDispatch()
    const classChange = useSelector(selectClassChange)
    const { user, urls, width, height, links } = photo
    const dwnld = `Size: ${width}x${height}`

    const openModals = () => {
        dispatch(openModal('zoom', photo))
        document.body.style.overflow = 'hidden';
        //window.history.pushState(null, '', `${window.location.pathname}/${photo.id}`)
    };
    const openPostModal = () => {
        dispatch(openModal('create', urls.full))
        document.body.style.overflow = 'hidden'
        //window.history.pushState(null, '', `${window.location.pathname}/create_post/${photo.id}`)
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
                    onClick={openModals}
                    alt="img"
                    className="gallery__img"
                    title="CLICK ON IMAGE TO ZOOM IN"
                />
                <div className="gallery__btns gallery__post"
                    to={`create_post/${photo.id}`}
                    onClick={openPostModal}>
                    <p>Create Post</p>
                </div>
                <Link
                    href={links.download}
                    className="gallery__btns gallery__download"
                    title={dwnld}
                >Down⌊✓⌋load</Link>
                <Link
                    href={`https://unsplash.com/@${user.username}`}
                    target='_blank'
                    title="Author"
                    rel="noreferrer"
                    className="gallery__btns gallery__credit">{user.name}
                </Link>
            </div>
        </li>
    )
}
export default PhotoComp