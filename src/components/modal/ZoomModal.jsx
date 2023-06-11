import React, { useState } from 'react'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatePostModal, setPhoto, setZoomModal } from '../../store/modals/modals.action'
import { selectPhoto } from '../../store/modals/modals.selector'
import Loader from '../Loading'

const ZoomModal = () => {
  const dispatch = useDispatch()
  const photo = useSelector(selectPhoto)
  const { urls, id, user, description, alt_description, links } = photo
  const closeModal = () => {
    dispatch(setPhoto(null))
    dispatch(setZoomModal(false))
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
  const [isLoad, setIsLoad] = useState(true)
  const handleLoadImage = () => {
    setIsLoad(false)
  }
  return (
    <div className="bg-modal" >
      {isLoad && <Loader />}
      <div className="modal" onLoad={handleLoadImage}>
        <img
          onClick={closeModal}
          src={urls.full}
          alt="img"
          title='CLICK ON IMAGE TO ZOOM OUT'
          className="modal__img" />
        <div className="modal__btns modal__post"
          to={`create_post/${id}`}
          onClick={openPostModal}>
          <p>Create Post</p>
        </div>
        <a
          href={links.download}
          className="modal__btns modal__download"
          title={'dwnld'}
        >Down⌊✓⌋load</a>
        <a
          href={`https://unsplash.com/@${user.username}`}
          target='_blank'
          title="Author"
          rel="noreferrer"
          className="modal__btns modal__credit">{user.username}
        </a>
        <span className='modal__description'>{description || alt_description || 'Description`s gone!'}</span>
      </div>
    </div >
  )
}

export default ZoomModal