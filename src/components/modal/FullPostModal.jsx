import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFullPost, setPhoto } from '../../store/modals/modals.action';
import { useNavigate } from 'react-router-dom';
import { selectPhoto } from '../../store/modals/modals.selector';
import Loader from '../Loading';

const FullPostModal = () => {
    const photo = useSelector(selectPhoto)
    const { title, subtitle, image, text, date, author } = photo
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
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const closeModal = () => {
        document.body.style.overflow = '';
        //let x = window.history.back()
        let x = navigate(-1)
        dispatch(setFullPost(false))
        dispatch(setPhoto(null))
        window.history.replaceState(null, '', x)
    }
    const [isLoad, setIsLoad] = useState(true)
    const handleLoadImage = () => {
        setIsLoad(false)
    }
    const x = 'style = "overflow: "";"'
    return (
        <div className="bg-modal">
            {isLoad && <Loader />}
            <div className="modal-blog" onLoad={handleLoadImage}>
                <div className="modal-blog__view">
                    <div className="modal-blog__view-top">
                        <h4 className="modal-blog__view-titles">Subtitle:</h4>
                        <h4 className="modal-blog__view-titles">Title:</h4>
                        <h4 className="modal-blog__view-titles">Created at:</h4>
                        <span className="modal-blog__view-subtitle buttons">{subtitle}</span>
                        <span className="modal-blog__view-title buttons">{title}</span>
                        <span className="modal-blog__view-date buttons">{formattedDate}</span>
                    </div>
                    <img
                        onClick={closeModal}
                        src={image}
                        alt="img"
                        title='CLICK ON IMAGE TO ZOOM OUT'
                        className="modal-blog__view-img" />
                    <div className="modal-blog__view-bottom">
                        <h4 className="modal-blog__view-titles">Descriptions:</h4>
                        <h4 className="modal-blog__view-titles">Author:</h4>
                        <p className="modal-blog__view-text buttons">{text}</p>
                        <span className="modal-blog__view-author buttons">{author}</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default FullPostModal