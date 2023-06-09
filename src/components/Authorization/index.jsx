import React, { useEffect } from 'react'
import './styles.scss'
import { setUser, setUserName } from '../../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, selectUserName } from '../../store/user/user.selector'
import { googleSignOut } from '../../api/Firebase'
import Button from '../Button'
import AuthorizationModal from '../modal/AuthorizationModal'
import { setAuthorizationModal } from '../../store/modals/modals.action'
import { selectAuthorizationModal } from '../../store/modals/modals.selector'

const Authorization = () => {
    const user = useSelector(selectUser)
    const userName = useSelector(selectUserName)
    const dispatch = useDispatch()
    const authModal = useSelector(selectAuthorizationModal)
    const setAuthModal = () => {
        dispatch(setAuthorizationModal(true))
        document.body.style.overflow = 'hidden';
        window.history.pushState(null, '', `${window.location.pathname}/auth`)
    }
    const logout = async () => {
        googleSignOut()
        dispatch(setUser(null))
        dispatch(setUserName(null))
        localStorage.removeItem('user')
    }
    useEffect(() => {
        if (user) {
            dispatch(setAuthorizationModal(false))
            document.body.style.overflow = '';
        }
    }, [user, dispatch])

    return (
        <div className="auth">
            <h2 className='auth__title'>Hello,{user ? ` ${userName}!` : ' Guest!'}</h2>
            {authModal && <AuthorizationModal setModal={setAuthModal} />}
            {user
                ?
                <Button className='auth__button' onClick={logout}>Sign Out</Button>
                :
                <Button className='auth__button' onClick={setAuthModal}>Sign In</Button>
            }
        </div>
    )
}
export default Authorization