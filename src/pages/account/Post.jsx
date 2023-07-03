import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { timeChanger } from '../../utils/utils';
import Loader from '../../components/Loading';
import Button from '../../components/Button';
import { openModal } from '../../store/modals/modals.action';
import { deletePosts, restorePosts } from '../../api/Firebase';

const AccountPost = ({ post, isDelete = null, callback, isComment = null, comment }) => {
    const { title, subtitle, image, date, id } = post
    const [show, setShow] = useState(true)
    const dispatch = useDispatch()
    const openModals = () => {
        dispatch(openModal('full', post))
        document.body.style.overflow = 'hidden';
        //window.history.pushState(null, '', `${window.location.pathname}/${id}`)
    };
    const editPost = () => {
        dispatch(openModal('edit', { ...post, isEdit: true }))
        document.body.style.overflow = 'hidden';
    }
    const deletePost = () => {
        deletePosts(id)
        //callback()
    }
    const restorePost = () => {
        restorePosts(id)
        //2mach request to firebase
        //callback()
    }
    const [isLoad, setIsLoad] = useState(true)
    const handleLoadImage = () => {
        setIsLoad(false)
    }
    if (isComment) {
        return (
            show ?
                (
                    <li className='show-my__body-post' onClick={() => setShow(false)}>
                        <div>
                            <div className="show-my__body-text">
                                <p >{comment}</p>
                            </div>
                        </div>
                    </li>
                )
                :
                (
                    <li className='show-my__body-post' onLoad={handleLoadImage} onClick={() => setShow(true)}>
                        {isLoad && <Loader />}
                        <img src={image} alt={title} onClick={openModals} className="show-my__body-img" />
                        <div>
                            <div className="show-my__body-text">
                                <p >Title:</p>
                                <p >{title.slice(0, 20)}</p>
                            </div>
                            <div className="show-my__body-text">
                                <p>Subtitle:</p>
                                <p>{subtitle.slice(0, 20)}</p>
                            </div>
                            <div className="show-my__body-text">
                                <p>Created At:</p>
                                <p >{timeChanger(date)}</p>
                            </div>
                        </div>
                        <Button buttonType='dark'
                            onClick={editPost}
                            className="show-my__body-btn edit">Edit</Button>
                        {isDelete === null ? (
                            <Button buttonType='dark'
                                onClick={deletePost}
                                className="show-my__body-btn delete">Delete</Button>
                        )
                            :
                            (<Button buttonType='dark'
                                onClick={restorePost}
                                className="show-my__body-btn delete">Restore</Button>)
                        }
                    </li>
                ))
    } else {
        return (
            <li className='show-my__body-post' onLoad={handleLoadImage} onClick={() => setShow(true)}>
                {isLoad && <Loader />}
                <img src={image} alt={title} onClick={openModals} className="show-my__body-img" />
                <div>
                    <div className="show-my__body-text">
                        <p >Title:</p>
                        <p >{title.slice(0, 20)}</p>
                    </div>
                    <div className="show-my__body-text">
                        <p>Subtitle:</p>
                        <p>{subtitle.slice(0, 20)}</p>
                    </div>
                    <div className="show-my__body-text">
                        <p>Created At:</p>
                        <p >{timeChanger(date)}</p>
                    </div>
                </div>
                <Button buttonType='dark'
                    onClick={editPost}
                    className="show-my__body-btn edit">Edit</Button>
                {isDelete === null ? (
                    <Button buttonType='dark'
                        onClick={deletePost}
                        className="show-my__body-btn delete">Delete</Button>
                )
                    :
                    (<Button buttonType='dark'
                        onClick={restorePost}
                        className="show-my__body-btn delete">Restore</Button>)
                }
            </li>
        )
    }
}

export default AccountPost