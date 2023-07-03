import React from 'react'
import Button from '../Button'
import './styles.scss'
import { useDispatch } from 'react-redux'
import CreatePostForm from '../Forms/CreatePost'
import { closeModal } from '../../store/modals/modals.action'

const CreatePostModal = () => {
  const dispatch = useDispatch()

  const closeModalsBg = (event) => {
    if (event.target === event.currentTarget) {
      document.body.style.overflow = '';
      dispatch(closeModal('create'))
      console.log('1')
    }
    console.log('2')
  }
  const closeModals = () => {
    document.body.style.overflow = '';
    dispatch(closeModal('create'))
  }




  return (
    <div className='bg-modal' onClick={closeModalsBg}>
      <div className="modal-form modal-form-post">
        <Button className="modal-form__button-close"
          buttonType='white'
          onClick={closeModals}>Close</Button>
        <CreatePostForm />
      </div>
    </div>
  )
}

export default CreatePostModal