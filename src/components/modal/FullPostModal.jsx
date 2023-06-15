import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setFullPost, setPhoto, setPost } from '../../store/modals/modals.action';
import { useNavigate } from 'react-router-dom';
import { selectPost, selectPostId, selectPostMap } from '../../store/modals/modals.selector';
import Loader from '../Loading';
import { timeChanger } from '../../utils/utils';

const FullPostModal = () => {
    const post = useSelector(selectPost)
    const postId = useSelector(selectPostId)
    const postMap = useSelector(selectPostMap)
    const [isLoad, setIsLoad] = useState(true)
    const [findPost, setFindPost] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const closeModal = () => {
        document.body.style.overflow = ''
        let x = navigate(-1)
        dispatch(setFullPost(false))
        dispatch(setPhoto(null))
        window.history.replaceState(null, '', x)
    }
    const handleLoadImage = () => {
        setIsLoad(false)
    }
    useEffect(() => {
        if (postMap) {
            const x = postMap.findIndex((obj) => obj.id === postId)
            dispatch(setPost(postMap[x]))
            setFindPost(x)
        }
    }, [postMap, postId, dispatch])
    //check if we change ID
    useEffect(() => {
        window.history.replaceState(null, '', `${post.id}`)
    }, [findPost, post.id])

    const { title, subtitle, image, text, date, author } = post

    const formattedDate = timeChanger(date)

    const nextPost = () => {
        if (findPost === postMap.length - 1) {
            dispatch(setPost(postMap[0]))
            setFindPost(0)
        } else {
            const nextPost = postMap[findPost + 1]
            if (nextPost) {
                dispatch(setPost(postMap[findPost + 1]))
                setFindPost(findPost + 1)
            }
        }
    }

    const prewPost = () => {
        if (findPost === 0) {
            dispatch(setPost(postMap[postMap.length - 1]))
            setFindPost(postMap.length - 1)
        } else {
            const prewPost = postMap[findPost - 1]
            if (prewPost) {
                dispatch(setPost(postMap[findPost - 1]))
                setFindPost(findPost - 1)
            }
        }
    }
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
                    <span className='modal-blog__view-image-prew'
                        placeholder='previous'
                        onClick={prewPost} disabled>
                        <svg width="32" height="32"
                            viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                            <desc lang="en-US">Chevron left</desc>
                            <path d="M15.5 18.5 14 20l-8-8 8-8 1.5 1.5L9 12l6.5 6.5Z">
                            </path>
                        </svg>
                    </span>
                    <img
                        onClick={closeModal}
                        src={image}
                        alt="img"
                        title='CLICK ON IMAGE TO ZOOM OUT'
                        className="modal-blog__view-img" />
                    <span className='modal-blog__view-image-next'
                        placeholder='next' onClick={nextPost}>
                        <svg width="32" height="32"
                            viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                            <desc lang="en-US">Chevron right</desc>
                            <path d="M8.5 5.5 10 4l8 8-8 8-1.5-1.5L15 12 8.5 5.5Z">
                            </path>
                        </svg>
                    </span>
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