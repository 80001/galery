import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loading'
import { closeModal, openModal } from '../../store/modals/modals.action'
import { selectSearchMap } from '../../store/search/search.selector'

const ZoomModal = ({ params }) => {
  const dispatch = useDispatch()
  const photoId = params.id
  const [photo, setPhoto] = useState(params)
  const photoMap = useSelector(selectSearchMap)
  const [findPhoto, setFindPhoto] = useState(null)
  const [isLoad, setIsLoad] = useState(true)

  console.log(photoMap)
  useEffect(() => {
    if (photoMap) {
      const x = photoMap.findIndex((obj) => obj.id === photoId)
      setPhoto(photoMap[x])
      setFindPhoto(x)

    }
  }, [])

  const { urls, id, user, description, alt_description, links } = photo ?? {}
  const closeModals = () => {
    dispatch(closeModal('zoom'))
    document.body.style.overflow = '';
    //window.history.back()
  };
  const openPostModal = () => {
    dispatch(openModal('create', photo.urls.full))
    //window.history.pushState(null, '', `create_post/${id}`)
  }
  const nextImage = () => {
    if (findPhoto === photoMap.length - 1) {
      setPhoto(photoMap[0])
      setFindPhoto(0)
    } else {
      const nextPhoto = photoMap[findPhoto + 1]
      if (nextPhoto) {
        setPhoto(photoMap[findPhoto + 1])
        setFindPhoto(findPhoto + 1)
      }
    }
  }
  const prewImage = () => {
    if (findPhoto === 0) {
      setPhoto(photoMap[photoMap.length - 1])
      setFindPhoto(photoMap.length - 1)
    } else {
      const prewPhoto = photoMap[findPhoto - 1]
      if (prewPhoto) {
        setPhoto(photoMap[findPhoto - 1])
        setFindPhoto(findPhoto - 1)
      }
    }
  }
  const handleLoadImage = () => {
    setIsLoad(false)
  }
  return (
    <div className='bg-modal'>
      <div className="modal" >
        {isLoad && <Loader />}
        <div className="modal-zoom" >
          <span className='modal-zoom__prew-image click' placeholder='previous' onClick={prewImage} disabled>
            <svg width="32" height="32"
              viewBox="0 0 24 24" version="1.1" aria-hidden="false">
              <desc lang="en-US">Chevron left</desc>
              <path d="M15.5 18.5 14 20l-8-8 8-8 1.5 1.5L9 12l6.5 6.5Z">
              </path>
            </svg>
          </span>
          <img
            onClick={closeModals}
            onLoad={handleLoadImage}
            src={urls?.full}
            alt="img"
            title='CLICK ON IMAGE TO ZOOM OUT'
            className="modal-zoom__img" />
          <span className='modal-zoom__next-image click' placeholder='next' onClick={nextImage}>
            <svg width="32" height="32"
              viewBox="0 0 24 24" version="1.1" aria-hidden="false">
              <desc lang="en-US">Chevron right</desc>
              <path d="M8.5 5.5 10 4l8 8-8 8-1.5-1.5L15 12 8.5 5.5Z">
              </path>
            </svg>
          </span>
          <div className="modal-zoom__btns modal-zoom__post"
            to={`create_post/${id}`}
            onClick={openPostModal}>
            <p>Create Post</p>
          </div>
          <a
            href={links?.download}
            className="modal-zoom__btns modal-zoom__download"
            title={'dwnld'}
          >Down⌊✓⌋load</a>
          <a
            href={`https://unsplash.com/@${user?.username}`}
            target='_blank'
            title="Author"
            rel="noreferrer"
            className="modal-zoom__btns modal-zoom__credit">{user?.username}
          </a>
          <span className='modal-zoom__description'>
            {description || alt_description || 'Description`s gone!'}
          </span>
        </div>
      </div >
    </div >
  )
}


export default ZoomModal