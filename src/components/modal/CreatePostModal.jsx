import React from 'react'
import Button from '../Button'
import './styles.scss'
import { useDispatch } from 'react-redux'
import CreatePostForm from '../Forms/CreatePost'
import { useNavigate } from 'react-router-dom'
import { setModal } from '../../store/blog/blog.action'

const CreatePostModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const closeModal = () => {
    document.body.style.overflow = '';
    dispatch(setModal(false))
    navigate(-1)
  }




  return (
    <div className="modal-form modal-form-post" onClick={e => e.stopPropagation()}>
      <Button className="modal-form__button-close"
        buttonType='white'
        onClick={closeModal}>Close</Button>
      <CreatePostForm />
    </div>
  )
}

export default CreatePostModal