import React from 'react'
import './styles.scss'
import { setAuthOut } from '../../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, selectUser } from '../../store/user/user.selector'
import { googleSignOut } from '../../api/Firebase'
import Button from '../Button'
import AuthorizationModal from '../modal/AuthorizationModal'
import { setAuthModal } from '../../store/modals/modals.action'
import { selectAuthModal } from '../../store/modals/modals.selector'

const Authorization = () => {
    const user = useSelector(selectUser)
    const auth = useSelector(selectAuth)
    const dispatch = useDispatch()
    const authModal = useSelector(selectAuthModal)
    const setAuthModals = () => {
        dispatch(setAuthModal(true))
        console.log('1')
        document.body.style.overflow = 'hidden';
        //window.history.pushState(null, '', `${window.location.pathname}/auth`)
    }
    const logout = async () => {
        googleSignOut()
        dispatch(setAuthOut())
        localStorage.removeItem('user')
    }

    return (
        <div className="auth">
            <h2 className='auth__title'>Hello,{auth ? ` ${user.displayName}!` : ' Guest!'}</h2>
            {authModal && <AuthorizationModal setModal={setAuthModals} />}
            {auth
                ?
                <Button className='auth__button' onClick={logout}>Sign Out</Button>
                :
                <Button className='auth__button' onClick={setAuthModal}>Sign In</Button>
            }
        </div>
    )
}
export default Authorization