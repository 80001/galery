import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loading';
import { timeChanger } from '../../utils/utils';
import Button from '../Button';
import { changePost } from '../../api/Firebase';
import { closeModal } from '../../store/modals/modals.action';
import { selectPostsAuthMap, selectPostsMap } from '../../store/blog/blog.selector';
import { useSwipeable } from 'react-swipeable';

const FullPostModal = ({ params }) => {
    const [post, setPost] = useState(params)
    const postId = params.id
    const postMap = useSelector(selectPostsMap)
    const postAuthMap = useSelector(selectPostsAuthMap)
    const [posts, setPosts] = useState(postMap || postAuthMap)
    const [isLoad, setIsLoad] = useState(true);
    const isEdit = params.isEdit || false
    const [findPost, setFindPost] = useState(null);
    const [newValues, setNewValues] = useState({
        title: post.title,
        subtitle: post.subtitle,
        text: post.text,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const closeModals = () => {
        document.body.style.overflow = '';
        if (isEdit) {
            dispatch(closeModal('edit'))
        } else {
            dispatch(closeModal('full'))
        }
    };

    const handleLoadImage = () => {
        setIsLoad(false);
    };

    useEffect(() => {
        if (postMap.length !== 0) {
            setPosts(postMap)
        } else if (postAuthMap !== 0) {
            setPosts(postAuthMap)
        }
    }, [postMap, postId, dispatch]);

    const { title, subtitle, image, text, date, author } = post;
    const formattedDate = timeChanger(date);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        changePost(postId, newValues)
        document.body.style.overflow = '';
        dispatch(closeModal('edit'))
        navigate('/account')
    };
    const handleSwipe = useSwipeable({
        onSwipedLeft: () => prewPost(),
        onSwipedRight: () => nextPost()
    })

    const nextPost = () => {
        if (findPost === posts.length - 1) {
            setPost(posts[0])
            setFindPost(0);
        } else {
            const nextPost = posts[findPost + 1];
            if (nextPost) {
                setPost(posts[findPost + 1])
                setFindPost(findPost + 1);
            }
        }
    };

    const prewPost = () => {
        if (findPost === 0) {
            setPost(posts[posts.length - 1])
            setFindPost(posts.length - 1);
        } else {
            const prewPost = posts[findPost - 1];
            if (prewPost) {
                setPost(posts[findPost - 1])
                setFindPost(findPost - 1);
            }
        }
    };

    if (isEdit) {
        return (
            <div className='bg-modal' {...handleSwipe}>
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
        );
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
                    </div>
                </div>
            </div>
        );
    }
};

export default FullPostModal;
