//import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import ZoomModal from "../../components/modal/ZoomModal"
import { useEffect, useState } from "react"

const PhotoComp = ({ photo }) => {
    const { user, urls, width, height, links } = photo
    //const { modal, setModal } = useState(false)

    const dwnld = `Size: ${width}x${height}`
    const navigate = useNavigate()
    const handleComments = (e) => {
        navigate('/')
    }
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
    };



    return (
        <li className={`gallery__item`}>
            <div className="gallery__item-view">
                {isModalOpen && (
                    <ZoomModal urls={urls.regular} links={links.download} setModal={setModalOpen} id={photo.id} username={user.username} user={user.name} dwnld={dwnld} />
                )}
                <Link className="" to={`image/${photo.id}`} onClick={openModal}>
                    <img
                        src={urls.regular}
                        alt="img"
                        className="gallery__img"
                    />
                </Link>
                <Link className="gallery__btns gallery__post" to={`create_post/${photo.id}`}>
                    Create Post
                </Link>
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