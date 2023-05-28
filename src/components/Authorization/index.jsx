import React from 'react'
import './styles.scss'
import { setUser, setUserName } from '../../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, selectUserName } from '../../store/user/user.selector'
import { googleSignOut, signInWithGooglePopUp, userInfo } from '../../api/Firebase'

const Authorization = () => {
    const user = useSelector(selectUser)
    const userName = useSelector(selectUserName)
    const dispatch = useDispatch()

    const logGoogleUser = async () => {
        if (user) {
            googleSignOut()
            dispatch(setUser(null))
            dispatch(setUserName(null))
        } else {
            const { user } = await signInWithGooglePopUp();
            //localStorage.setItem('token', user.accessToken);
            //localStorage.setItem('user', user);
            userInfo(user)
            dispatch(setUser(user))
            dispatch(setUserName(user.displayName))
            console.log(user, userName)
        }
    }

    return (
        <div className="auth">
            <h2 className='auth__title'>Hello,{user ? ` ${userName}!` : ' Guest!'}</h2>
            <button className='auth__button' onClick={logGoogleUser}>{user ? 'Sign Out' : "Sign In"}</button>
        </div>
    )
}
export default Authorization