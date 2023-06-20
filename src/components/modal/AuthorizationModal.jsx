import React from 'react'
import { useDispatch } from 'react-redux';
import SignUpForm from '../Forms/SignUp';
import SignInForm from '../Forms/SignIn';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../store/modals/modals.action'

const AuthorizationModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const closeModals = () => {
    dispatch(closeModal('auth'))
    document.body.style.overflow = '';
  }


  return (
    <div className='bg-modal'>
      <div className="modal-form" onClick={e => e.stopPropagation()}>
        <Button className="modal-form__button-close"
          buttonType='white'
          onClick={closeModals}>Close</Button>
        <div className="modal-auth">
          <SignUpForm />
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

export default AuthorizationModal