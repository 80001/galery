import { ErrorMessage, Field, Form, Formik } from 'formik'
import Button from '../Button'
import './styles.scss'
import { useState } from 'react'
import { ReactComponent as Show } from '../../media/show.svg'
import { ReactComponent as Hide } from '../../media/hide.svg'
import { useDispatch } from 'react-redux'
//import { signsSchema } from './Schemas'
import { createUserDoc, signUpWithEmail } from '../../api/Firebase'
import { setUser, setUserImage, setUserName } from '../../store/user/user.action'
import { useNavigate } from 'react-router-dom'

const SignUpForm = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        name: '',
        password: '',
        passwordCheck: '',
    }
    const onSubmit = async (values, { resetForm }) => {
        const { email, name, password, passwordCheck } = values
        if (password !== passwordCheck) {
            alert('Passwords do not match!');
        }
        try {
            const userCredential = await signUpWithEmail(email, password, name)
            const user = userCredential.user
            await createUserDoc(user)
            dispatch(setUser(user))
            dispatch(setUserName(user.displayName))
            dispatch(setUserImage(user.photoURL))
            localStorage.setItem('user', JSON.stringify(user))
            navigate(-1)
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('This email is already registered!');
            } else {
                console.log('User creation encountered an error:', error);
            }
        }
        resetForm();
    };

    const showPass = () => {
        if (show) return 'text'
        else return 'password'
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className="sign-up__form" >
                    <div className="sign-up__form-titles">
                        <label className="sign-up__titles-title title-up">Sign Up</label>
                        <label className="sign-up__titles-subtitle subtitle-up">Doesn`t have an account!?<br /> Sign up right now!</label>
                    </div>
                    <div className="sign-up__form-inputs">
                        <div className="sign-up__form-wrap">
                            <Field type='text'
                                id='email'
                                name='email'
                                placeholder='dick'
                                className="form-wrap-email-input input" />
                            <label htmlFor="email" id='email-l'
                                className="form-wrap__form-email label"
                            >Email:</label>
                            <ErrorMessage name='email' component='p' className='errors' />
                        </div>
                        <div className="sign-up__form-wrap">
                            <Field type='text'
                                id='name'
                                name='name'
                                placeholder='dick'
                                className="form-wrap__name-input input" />
                            <label htmlFor="name" id='name-l'
                                className="form-wrap__form-name label"
                            >Name:</label>
                            <ErrorMessage name='name' component='p' className='errors' />
                        </div>
                        <div className="sign-up__form-wrap">
                            <Field type={showPass()}
                                id='password'
                                placeholder='dick'
                                name='password'
                                className="form-wrap__pass-input input input-p" />
                            <label htmlFor="password" id='password-l'
                                className="form-wrap__form-pass label"
                            >Password:</label>
                            <ErrorMessage name='password' component='p' className='errors' />
                            <span
                                onClick={() => { setShow(!show) }}
                                className='form-wrap__button'
                                style={{ cursor: 'pointer' }}>{show ? <Hide /> : <Show />}</span>
                        </div>
                        <div className="sign-up__form-wrap">
                            <Field type={showPass()}
                                id='passwordCheck'
                                placeholder='dick'
                                name='passwordCheck'
                                className="form-wrap__pass-check-input input input-p" />
                            <label htmlFor="passwordCheck" id='passwordCheck-l'
                                className="form-wrap__form-pass-check label"
                            >Check Password:</label>
                            <ErrorMessage name='passwordCheck' component='p' className='errors' />
                            <span
                                onClick={() => { setShow(!show) }}
                                className='form-wrap__button'
                                style={{ cursor: 'pointer' }}>{show ? <Hide /> : <Show />}</span>
                        </div>
                    </div>
                    <div className="sign-up__form-buttons">
                        <Button type='submit'
                            buttonType='dark'
                            className='sign-up__button-sub'>Submit</Button>
                    </div>
                </Form>
            </Formik>
        </>
    )
}

export default SignUpForm