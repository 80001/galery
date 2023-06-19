import React from 'react'
import { useDispatch } from 'react-redux';
import SignUpForm from '../Forms/SignUp';
import SignInForm from '../Forms/SignIn';
import Button from '../Button';
import { setModal } from '../../store/modals/modals.action';
import { useNavigate } from 'react-router-dom';

const AuthorizationModal = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const closeModal = () => {
    if (window.location.pathname.includes('account')) {
      dispatch(setModal(false))
      navigate('/')
    } else {
      dispatch(setModal(false))
      document.body.style.overflow = '';
      //window.history.back()
    }
  }


  return (
    <div className="modal-form" onClick={e => e.stopPropagation()}>
      <Button className="modal-form__button-close"
        buttonType='white'
        onClick={closeModal}>Close</Button>
      <div className="modal-auth">
        <SignUpForm />
        <SignInForm />
      </div>
    </div>
  )
}

export default AuthorizationModal