import { useDispatch } from "react-redux"
import { setCreatePostModal, setFullPost, setPhoto } from "../../store/modals/modals.action"
import Loader from "../../components/Loading"
import { useState } from "react"

const BlogComponent = ({ photo }) => {
    const { title, subtitle, image, text, date, author } = photo
    const dispatch = useDispatch()
    const shortText = text.slice(0, 100)
    //const classChange = useSelector(selectClassChange)
    const timestamp = date.seconds * 1000;
    const datx = new Date(timestamp);
    const formattedDate = datx.toLocaleString('uk-UK', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC',
    });

    const openModal = () => {
        dispatch(setPhoto(photo))
        dispatch(setFullPost(true))
        //document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `${window.location.pathname}/${photo.id}`)
    };
    const openPostModal = () => {
        dispatch(setCreatePostModal(true))
        document.body.style.overflow = 'hidden'
        window.history.pushState(null, '', `${window.location.pathname}/create_post/${photo.id}`)
    };
    const [isLoad, setIsLoad] = useState(true)
    const handleLoadImage = () => {
        setIsLoad(false)
    }
    return (
        <li className={`blog__item`} >
            {isLoad && <Loader />}
            <div className="blog__item-view">
                <div className="blog__item-view-top">
                    <h4 className="blog__item-view-titles">Subtitle:</h4>
                    <h4 className="blog__item-view-titles">Title:</h4>
                    <h4 className="blog__item-view-titles">Created at:</h4>
                    <span className="blog__item-view-subtitle buttons">{subtitle}</span>
                    <span className="blog__item-view-title buttons">{title}</span>
                    <span className="blog__item-view-date buttons">{formattedDate}</span>
                </div>
                <img
                    src={image}
                    alt={title}
                    className="blog__item-view-img"
                    onClick={openModal}
                    title="SHOW FULL POST"
                    onLoad={handleLoadImage}
                />
                <div className="blog__item-view-bottom">
                    <h4 className="blog__item-view-titles" >Descriptions:</h4>
                    <h4 className="blog__item-view-titles" onClick={openPostModal}>Author:</h4>
                    <p className="blog__item-view-text">{shortText}{text.length > shortText.length ? "..." : ''}</p>
                    <span className="blog__item-view-author buttons">{author}</span>
                </div>
            </div>
        </li>
    )
}
export default BlogComponent