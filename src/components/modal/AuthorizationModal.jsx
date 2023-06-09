import React from 'react'
import { useDispatch } from 'react-redux';
import SignUpForm from '../Forms/SignUp';
import SignInForm from '../Forms/SignIn';
import Button from '../Button';
import { setAuthorizationModal } from '../../store/modals/modals.action';

const AuthorizationModal = () => {
  const dispatch = useDispatch()

  const closeModal = () => {
    dispatch(setAuthorizationModal(false))
    document.body.style.overflow = '';
    window.history.back()
  }


  return (
    <div className='bg-modal' onClick={closeModal}>
      <div className="modal-form" onClick={e => e.stopPropagation()}>
        <Button className="modal-form__button-close"
          buttonType='white'
          onClick={closeModal}>Close</Button>
        <div className="modal-auth">
          <SignUpForm />
          <SignInForm />
        </div>
      </div>
    </div>
  )
}

export default AuthorizationModal