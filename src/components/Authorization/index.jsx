import React from 'react'
import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth } from '../../store/user/user.selector'
import { googleSignOut } from '../../api/Firebase'
import Button from '../Button'
import { openModal } from '../../store/modals/modals.action'
import { setAuthOut } from '../../store/user/user.action'

const Authorization = ({ setOpen }) => {
    const auth = useSelector(selectAuth)
    const dispatch = useDispatch()
    const setAuthModals = () => {
        dispatch(openModal('auth'))
        document.body.style.overflow = 'hidden';
        setOpen(false)
        //window.history.pushState(null, '', `${window.location.pathname}/auth`)
    }
    const logout = async () => {
        googleSignOut()
        dispatch(setAuthOut())
        localStorage.removeItem('user')
        setOpen(false)
    }

    return (
        <div className="auth">
            <h2 className='auth__title'>Hello,{auth ? ` ${auth.displayName}!` : ' Guest!'}</h2>
            {auth
                ?
                <Button className='auth__button' onClick={logout}>Sign Out</Button>
                :
                <Button className='auth__button' onClick={setAuthModals}>Sign In</Button>
            }
        </div>
    )
}
export default Authorization