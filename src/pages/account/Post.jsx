import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setEditPost, setFullPost, setPost, setPostId } from '../../store/modals/modals.action';
import { timeChanger } from '../../utils/utils';
import Loader from '../../components/Loading';
import Button from '../../components/Button';

const AccountPost = ({ post }) => {
    const { title, subtitle, image, date, id } = post
    const dispatch = useDispatch()
    const openModal = () => {
        dispatch(setPost(post))
        dispatch(setPostId(id))
        dispatch(setFullPost(true))
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `${window.location.pathname}/${id}`)
    };
    const editPost = () => {
        dispatch(setEditPost(true))
    }
    const deletePost = () => {
        let ask = prompt('Enter right answer to delete post! WHO IS REALY YOUR MOM?!')
        alert(`${ask} is wrong answer! Trast me, i know it!`)
    }
    const [isLoad, setIsLoad] = useState(true)
    const handleLoadImage = () => {
        setIsLoad(false)
    }

    return (
        <li className='show-my__body-post' onLoad={handleLoadImage}>
            {isLoad && <Loader />}
            <img src={image} alt={title} onClick={openModal} className="show-my__body-img" />
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

            <Button buttonType='dark'
                onClick={editPost}
                className="show-my__body-btn edit">Edit</Button>
            <Button buttonType='dark'
                onClick={deletePost}
                className="show-my__body-btn delete">Delete</Button>
        </li>
    )
}

export default AccountPost