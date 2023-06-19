import { useDispatch, useSelector } from "react-redux"
import { setCreatePostModal, setFullPost } from "../../store/modals/modals.action"
import Loader from "../../components/Loading"
import { useState } from "react"
import { timeChanger } from "../../utils/utils"
import { selectClassChange } from "../../store/search/search.selector"

const BlogComponent = ({ photo }) => {
    const { title, subtitle, image, text, date, author } = photo
    const dispatch = useDispatch()
    const classChange = useSelector(selectClassChange)
    const shortText = text.slice(0, 100)
    const formattedDate = timeChanger(date)

    const openModal = () => {
        dispatch(setFullPost(photo))
        document.body.style.overflow = 'hidden';
        //window.history.pushState(null, '', `${window.location.pathname}/${photo.id}`)
    };
    const openPostModal = () => {
        dispatch(setCreatePostModal(true))
        document.body.style.overflow = 'hidden'
        //window.history.pushState(null, '', `${window.location.pathname}/create_post/${photo.id}`)
    };
    const [isLoad, setIsLoad] = useState(true)
    const handleLoadImage = () => {
        setIsLoad(false)
    }
    return (
        <li className={`blog__item${classChange}`} >
            {isLoad && <Loader />}
            <div className={`blog__item-view${classChange}`}>
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