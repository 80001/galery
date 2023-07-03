import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loading';
import { timeChanger } from '../../utils/utils';
import Button from '../Button';
import { changePost, createPostComment } from '../../api/Firebase';
import { closeModal } from '../../store/modals/modals.action';
import { selectPostsAuthMap, selectPostsMap } from '../../store/blog/blog.selector';
import { useSwipeable } from 'react-swipeable';
import { selectAuth } from '../../store/user/user.selector';

const FullPostModal = ({ params }) => {
    const [post, setPost] = useState(params)
    const postId = params.id
    const postMap = useSelector(selectPostsMap)
    const auth = useSelector(selectAuth)
    const postAuthMap = useSelector(selectPostsAuthMap)
    const [posts, setPosts] = useState(postMap || postAuthMap)
    const [isLoad, setIsLoad] = useState(true)
    const isEdit = params.isEdit || false
    const [findPost, setFindPost] = useState(null)
    const textareaRef = useRef(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.marginTop = 'auto';
        textarea.style.height = `${textarea.scrollHeight + 20}px`;
    };
    const [newValues, setNewValues] = useState({
        title: post.title,
        subtitle: post.subtitle,
        text: post.text,
    });
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const closeModalsBg = (event) => {
        document.body.style.overflow = ''
        if (event.target === event.currentTarget) {
            if (isEdit) {
                dispatch(closeModal('edit'))
            } else {
                dispatch(closeModal('full'))
            }
        }
    }
    const closeModals = () => {
        document.body.style.overflow = ''
        if (isEdit) {
            dispatch(closeModal('edit'))
        } else {
            dispatch(closeModal('full'))
        }
    }

    const handleLoadImage = () => {
        setIsLoad(false)
    }
    useEffect(() => {
        if (postMap.length !== 0) {
            setPosts(postMap)
        } else if (postAuthMap !== 0) {
            setPosts(postAuthMap)
        }
    }, [postMap, postId, dispatch])

    const { title, subtitle, image, text, date, author, comments } = post
    const formattedDate = timeChanger(date)


    const handleChange = (e) => {
        const { name, value } = e.target
        setNewValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }))
    }
    const handleComment = (e) => {
        e.preventDefault()
        let imageURL = auth.photoURL
        if (!imageURL.includes('https://')) {
            imageURL = 'https://' + imageURL
        } else {
        }
        createPostComment(post.id, { author: auth.displayName, avatar: imageURL, text: textareaRef.current.value })
        console.log(postId, { author: auth.displayName, avatar: imageURL, text: textareaRef.current.value })
        textareaRef.current.value = ''
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        changePost(postId, newValues)
        document.body.style.overflow = ''
        dispatch(closeModal('edit'))
        navigate('/account')
    }
    const handleSwipe = useSwipeable({
        onSwipedLeft: () => prewPost(),
        onSwipedRight: () => nextPost()
    })

    const nextPost = (e) => {
        e.stopPropagation()
        if (findPost === posts.length - 1) {
            setPost(posts[0])
            setFindPost(0)
        } else {
            const nextPost = posts[findPost + 1]
            if (nextPost) {
                setPost(posts[findPost + 1])
                setFindPost(findPost + 1)
            }
        }
    }

    const prewPost = (e) => {
        e.stopPropagation()
        if (findPost === 0) {
            setPost(posts[posts.length - 1])
            setFindPost(posts.length - 1)
        } else {
            const prewPost = posts[findPost - 1]
            if (prewPost) {
                setPost(posts[findPost - 1])
                setFindPost(findPost - 1)
            }
        }
    }

    if (isEdit) {
        return (
            <div className='bg-modal' {...handleSwipe} onClick={closeModalsBg}>
                <div className="modal-blog" onLoad={handleLoadImage}>
                    {isLoad && <Loader />}
                    <form onSubmit={handleSubmit} className="modal-blog__view">
                        <div className="modal-blog__view-top">
                            <h4 className="modal-blog__view-titles">Subtitle:</h4>
                            <h4 className="modal-blog__view-titles">Title:</h4>
                            <h4 className="modal-blog__view-titles">Created at:</h4>
                            <input
                                type="text"
                                name="subtitle"
                                value={newValues.subtitle}
                                onChange={handleChange}
                                className="modal-blog__view-subtitle buttons"
                            />
                            <input
                                type="text"
                                name="title"
                                value={newValues.title}
                                onChange={handleChange}
                                className="modal-blog__view-title buttons"
                            />
                            <span className="modal-blog__view-date buttons">{formattedDate}</span>
                        </div>
                        <img
                            onClick={closeModals}
                            src={image}
                            alt="img"
                            title="CLICK ON IMAGE TO ZOOM OUT"
                            className="modal-blog__view-img"
                        />
                        <div className="modal-blog__view-bottom">
                            <h4 className="modal-blog__view-titles">Descriptions:</h4>
                            <h4 className="modal-blog__view-titles">Author:</h4>
                            <textarea name="text"
                                value={newValues.text}
                                onChange={handleChange} id="text" cols="30" rows="10">
                            </textarea>
                            <span className="modal-blog__view-author buttons">{author}</span>
                        </div>
                        <div className='modal-blog__view-buttons'>

                            <Button>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    } else {
        return (
            <div className='bg-modal' {...handleSwipe}>
                <div className="modal-blog" onLoad={handleLoadImage}>
                    {isLoad && <Loader />}
                    <div className="modal-blog__view">
                        <div className="modal-blog__view-top">
                            <h4 className="modal-blog__view-titles">Subtitle:</h4>
                            <h4 className="modal-blog__view-titles">Title:</h4>
                            <h4 className="modal-blog__view-titles">Created at:</h4>
                            <span className="modal-blog__view-subtitle buttons">{subtitle}</span>
                            <span className="modal-blog__view-title buttons">{title}</span>
                            <span className="modal-blog__view-date buttons">{formattedDate}</span>
                        </div>
                        <span
                            className="modal-blog__view-image-prew"
                            placeholder="previous"
                            onClick={prewPost}
                            disabled
                        >
                            <svg width="32" height="32" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                                <desc lang="en-US">Chevron left</desc>
                                <path d="M15.5 18.5 14 20l-8-8 8-8 1.5 1.5L9 12l6.5 6.5Z"></path>
                            </svg>
                        </span>
                        <img
                            onClick={closeModals}
                            src={image}
                            alt="img"
                            title="CLICK ON IMAGE TO ZOOM OUT"
                            className="modal-blog__view-img"
                        />
                        <span className="modal-blog__view-image-next" placeholder="next" onClick={nextPost}>
                            <svg width="32" height="32" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                                <desc lang="en-US">Chevron right</desc>
                                <path d="M8.5 5.5 10 4l8 8-8 8-1.5-1.5L15 12 8.5 5.5Z"></path>
                            </svg>
                        </span>
                        <div className="modal-blog__view-bottom">
                            <h4 className="modal-blog__view-titles">Descriptions:</h4>
                            <h4 className="modal-blog__view-titles">Author:</h4>
                            <p className="modal-blog__view-text buttons">{text}</p>
                            <span className="modal-blog__view-author buttons">{author}</span>
                        </div>
                        <div className="modal-blog__view-comments">
                            {comments !== undefined
                                ?
                                <div className="comments-wrap">
                                    <h3 className="comments-title">Comments: {comments?.length}</h3>
                                    {comments.map(comment => (
                                        <div className="comment" key={comment.text}>
                                            <div className='comment-about'>
                                                <img className="comment-avatar" src={comment.avatar} alt={comment.author} />
                                                <h5 className="comment-author">{comment.author}</h5>
                                            </div>
                                            <p className="comment-text">{comment.text}</p>
                                        </div>
                                    ))}
                                    <form onSubmit={handleComment} className="comments-create">
                                        <p className="comments-title">Write a comment</p>
                                        <textarea
                                            ref={textareaRef}
                                            onChange={adjustTextareaHeight}
                                            placeholder="Type your comment..."
                                            type="text"
                                            className="comments-create__input" />
                                        <Button className='comments-create__button'>Send</Button>
                                    </form>
                                </div>
                                :
                                <div className="comments-wrap">
                                    <h3 className="comments-title">No comments yet!<br />Create one!</h3>
                                    <form onSubmit={handleComment} className="comments-create">
                                        <p className="comments-title">Write a comment</p>
                                        <textarea type="text" className="comments-create__input" ref={textareaRef}
                                            onChange={adjustTextareaHeight}
                                            placeholder="Type your comment..." />
                                        <Button className='comments-create__button'>Send</Button>
                                    </form>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default FullPostModal;
