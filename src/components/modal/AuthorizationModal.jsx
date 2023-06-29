import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import SignUpForm from '../Forms/SignUp';
import SignInForm from '../Forms/SignIn';
import Button from '../Button';
import { closeModal } from '../../store/modals/modals.action'
import { isMobile } from 'react-device-detect';

const AuthorizationModal = () => {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)


  const closeModals = () => {
    dispatch(closeModal('auth'))
    document.body.style.overflow = '';
  }
  const closeModalPC = () => {
    if (!isMobile) {
      dispatch(closeModal('auth'))
      document.body.style.overflow = '';
    }
  }

  return (
    <div className='bg-modal' onClick={closeModalPC}>
      <div className="modal-form" >
        <Button className="modal-form__button-close"
          buttonType='white'
          onClick={closeModals}>Close</Button>
        {isMobile
          ?
          <div className="modal-auth">
            <Button buttonType='white' className='modal-auth__button-change' onClick={() => setShow(!show)}>{show ? 'Go to Log In' : 'Go to Registration'}</Button>
            {show && <SignUpForm />}
            {!show && <SignInForm />}
          </div>
          :
          <div className="modal-auth">
            <SignUpForm />
            <SignInForm />
          </div>
        }
      </div>
    </div>
  )
}

export default AuthorizationModal