import React from 'react'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { setCreatePostModal, setZoomModal } from '../../store/modals/modals.action'

const ZoomModal = (props) => {
  const dispatch = useDispatch()
  const { urls, id, username, user, onClose, description, links } = props
  const closeModal = () => {
    onClose()
    dispatch(setZoomModal(false))
    console.log('close')
    document.body.style.overflow = '';
    window.history.back()
  };
  const openPostModal = () => {
    dispatch(setCreatePostModal(true))
    window.history.pushState(null, '', `create_post/${id}`)
  }
  if (id === 'none') {
    dispatch(setZoomModal(false))
  }
  return (
    <div className="bg-modal">
      <div className="modal">
        <img
          onClick={closeModal}
          src={urls}
          alt="img"
          title='CLICK ON IMAGE TO ZOOM OUT'
          className="modal__img" />
        <div className="modal__btns modal__post"
          to={`create_post/${id}`}
          onClick={openPostModal}>
          <p>Create Post</p>
        </div>
        <a
          href={links}
          className="modal__btns modal__download"
          title={'dwnld'}
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