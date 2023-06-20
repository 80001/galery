import React from 'react'
import Button from '../Button'
import './styles.scss'
import { useDispatch } from 'react-redux'
import CreatePostForm from '../Forms/CreatePost'
import { useNavigate } from 'react-router-dom'
import { closeModal } from '../../store/modals/modals.action'

const CreatePostModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const closeModals = () => {
    document.body.style.overflow = '';
    dispatch(closeModal('create'))
    navigate(-1)
  }




  return (
    <div className='bg-modal'>
      <div className="modal-form modal-form-post" onClick={e => e.stopPropagation()}>
        <Button className="modal-form__button-close"
          buttonType='white'
          onClick={closeModals}>Close</Button>
        <CreatePostForm />
      </div>
    </div>
  )
}

export default CreatePostModal