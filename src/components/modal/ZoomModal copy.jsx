

import React from 'react'
import { Link } from "react-router-dom"
import './styles.scss'
import { useDispatch } from 'react-redux'
import { setOpenModal, setOpenPostModal } from '../../store/gallery/gallery.action'

const ZoomModal = (props) => {
  const { urls, id, username, user, dwnld, description, links } = props
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setOpenModal(false))
    document.body.style.overflow = '';
    window.history.pushState(null, '', '/')
  };

  const openPostModal = () => {
    dispatch(setOpenPostModal(true))
  }

  return (
    <div className="bg-modal" onClick={closeModal}>
      <div className="modal">
        <img
          onClick={closeModal}
          src={urls}
          alt="img"
          title='CLICK ON IMAGE TO ZOOM OUT'
          className="modal__img" />
        <Link className="modal__btns modal__post"
          to={`create_post/${id}`}
          onClick={openPostModal}>
          <p>Create Post</p>
        </Link>
        <a
          href={links}
          className="modal__btns modal__download"
          title={dwnld}
        >Down⌊✓⌋load</a>
        <a
          href={`https://unsplash.com/@${username}`}
          target='_blank'
          title="Author"
          rel="noreferrer"
          className="modal__btns modal__credit">{user}
        </a>
        <span className='modal__description'>{description}</span>
      </div>
    </div >
  )
}

export default ZoomModal