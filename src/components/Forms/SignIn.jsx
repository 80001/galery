import { ErrorMessage, Field, Form, Formik } from 'formik'
import Button from '../Button'
//import './styles.scss'
import { setUser, setUserName } from '../../store/user/user.action'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, selectUserName } from '../../store/user/user.selector'
import { googleSignOut, signInWithGooglePopUp, userInfo } from '../../api/Firebase'
import { useState } from 'react'
import { ReactComponent as Show } from '../../media/show.svg'
import { ReactComponent as Hide } from '../../media/hide.svg'
import { setAuthorizationModal } from '../../store/modals/modals.action'

const SignInForm = () => {
    const user = useSelector(selectUser)
    const userName = useSelector(selectUserName)
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)

    const logGoogleUser = async () => {
        if (user) {
            googleSignOut()
            dispatch(setUser(null))
            dispatch(setUserName(null))
            dispatch(setAuthorizationModal(false))
        } else {
            const { user } = await signInWithGooglePopUp();
            //localStorage.setItem('token', user.accessToken);
            //localStorage.setItem('user', user);
            userInfo(user)
            dispatch(setUser(user))
            dispatch(setUserName(user.displayName))
            console.log(user, userName)
            dispatch(setAuthorizationModal(false))
        }
    }
    const initialValues = {
        email: '',
        password: '',
    }
    const onSubmit = (values) => {
        console.log(values)
        values = initialValues
    }
    const showPass = () => {
        if (show) return 'text'
        else return 'password'
    }
    return (
        <div className='modal-auth__sign-in'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
                <Form className="sign-in__form" >
                    <div className="sign-in__form-titles">
                        <label className="sign-in__title title-up">Sign In</label>
                        <label className="sign-in__subtitle subtitle-up">Allready have an account!?<br /> Sign in right now!</label>
                    </div>
                    <div className="sign-in__form-inputs">
                        <div className="sign-in__form-wrap">
                            <Field type='text'
                                id='emails'
                                name='email'
                                placeholder='dick'
                                className="form-wrap-email-input input" />
                            <label htmlFor="emails" id='email-l'
                                className="form-wrap__form-email label"
                            >Email:</label>
                            <ErrorMessage name='email' component='div' />
                        </div>
                        <div className="sign-in__form-wrap">
                            <Field type={showPass()}
                                id='passwords'
                                placeholder='dick'
                                name='password'
                                className="form-wrap__pass-input input input-p" />
                            <label htmlFor="passwords" id='password-l'
                                className="form-wrap__form-pass label"
                            >{ }Password:</label>
                            <ErrorMessage name='password' component='div' />
                            <span
                                onClick={() => { setShow(!show) }}
                                className='form-wrap__button'
                            >{show ? <Hide /> : <Show />}</span>
                        </div>
                    </div>
                    <div className='sign-in__form-buttons'>
                        <Button type='submit'
                            buttonType='dark'
                            className='sign-in__button-sub'>SIGN IN</Button>
                        <Button className='auth__button' onClick={logGoogleUser}>{user ? 'Sign Out' : "Sign In with google"}</Button>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default SignInForm