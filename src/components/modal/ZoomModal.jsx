import React from 'react'
import { Link } from "react-router-dom"
import './styles.scss'

const ZoomModal = (props) => {
  const { urls, id, username, user, dwnld, setModal, description, setPostModal, links } = props
  const openModal = () => {
    setModal(false);
    document.body.style.overflow = '';
  };
  const openPostModal = () => {
    setPostModal(true)
  }
  return (
    <div className="bg-modal">
      <div className="modal">
        <Link Link className="" to={`/`} onClick={openModal}>
          < img
            src={urls}
            alt="img"
            className="modal__img" />
        </Link>
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
    </div>
  )
}

export default ZoomModal