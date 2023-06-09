import { useDispatch, useSelector } from "react-redux"
import { setCreatePostModal, setZoomModal } from "../../store/modals/modals.action"

const BlogComponent = ({ photo }) => {
    const { title, subtitle, image, text, date, author } = photo
    const dispatch = useDispatch()
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
    console.log(formattedDate);

    const openModal = () => {
        dispatch(setZoomModal(true))
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `${window.location.pathname}/${photo.id}`)
    };
    const openPostModal = () => {
        dispatch(setCreatePostModal(true))
        document.body.style.overflow = 'hidden'
        window.history.pushState(null, '', `${window.location.pathname}/create_post/${photo.id}`)
    };

    return (
        <li className={`blog__item`}>
            <div className="blog__item-view">
                <img
                    src={image}
                    alt={title}
                    className="blog__item-view-img"
                    title="CLICK ON IMAGE TO ZOOM IN"
                />
                <span className="blog__item-view-title buttons">{title}</span>
                <span className="blog__item-view-date buttons">{formattedDate}</span>
                <span className="blog__item-view-author buttons">{author}</span>
                <span className="blog__item-view-subtitle buttons">{subtitle}</span>
                <p className="blog__item-view-text">{'text'}</p>
            </div>
        </li>
    )
}
export default BlogComponent