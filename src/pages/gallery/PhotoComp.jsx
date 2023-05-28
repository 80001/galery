//import { useState } from "react"
import { Link, useNavigate, } from "react-router-dom"
import ZoomModal from "../../components/modal/ZoomModal"
import { useState } from "react"
import CreatePost from "../../components/modal/CreatePost"

const PhotoComp = ({ photo }) => {
    const navigate = useNavigate()
    const { user, urls, width, height, links } = photo
    //const { modal, setModal } = useState(false)

    const dwnld = `Size: ${width}x${height}`

    const [isModalOpen, setModalOpen] = useState(false);
    const [isPostModalOpen, setPostModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `/image/${photo.id}`)
    };
    const openPostModal = () => {
        setPostModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <li className={`gallery__item`}>
            <div className="gallery__item-view">
                {isModalOpen && (
                    <ZoomModal urls={urls.regular}
                        setPostModal={setPostModalOpen}
                        links={links.download}
                        setModal={setModalOpen}
                        id={photo.id}
                        username={user.username}
                        user={user.name}
                        dwnld={dwnld}
                        description={photo.description || photo.alt_description} />
                )}
                {isPostModalOpen && (
                    <CreatePost setPost={setPostModalOpen} url={urls.regular} />
                )}
                <img
                    src={urls.regular}
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