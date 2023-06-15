import { ErrorMessage, Field, Form, Formik } from 'formik'
import './styles.scss'
import Button from '../Button'
import { setUser, setUserImage, setUserName } from '../../store/user/user.action'
import { useDispatch } from 'react-redux'
import { createUserDoc, signInWithEmail, signInWithGooglePopUp } from '../../api/Firebase'
import { useState } from 'react'
import { ReactComponent as Show } from '../../media/show.svg'
import { ReactComponent as Hide } from '../../media/hide.svg'
import { useNavigate } from 'react-router-dom'

const SignInForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopUp()
        createUserDoc(user)
        dispatch(setUser(user))
        dispatch(setUserName(user.displayName))
        dispatch(setUserImage(user.photoURL))
        localStorage.setItem('user', JSON.stringify(user))
        navigate(-1)
    };
    const initialValues = {
        email: '',
        password: '',
    };
    const onSubmit = async (values, { resetForm }) => {
        try {
            const user = await signInWithEmail(values.email, values.password)
            dispatch(setUser(user.user))
            dispatch(setUserName(user.user.displayName))
            dispatch(setUserImage(user.photoURL))
            localStorage.setItem('user', JSON.stringify(user.user))
            resetForm()
            navigate(-1)
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Incorrect password for Email');
                    break;
                case 'auth/user-not-found':
                    alert('No user with this Email');
                    break;
                default:
            }
        }
    };
    const showPass = () => {
        if (show) return 'text';
        else return 'password';
    };
    return (
        <>
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
                        <Button type='button' className='auth__button' onClick={logGoogleUser}>Sign In with google</Button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default SignInForm