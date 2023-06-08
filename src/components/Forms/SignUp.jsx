import { ErrorMessage, Field, Form, Formik } from 'formik'
import Button from '../Button'
import { useState } from 'react'
import { ReactComponent as Show } from '../../media/show.svg'
import { ReactComponent as Hide } from '../../media/hide.svg'
import { useDispatch } from 'react-redux'
import { setAuthorizationModal } from '../../store/modals/modals.action'

const SignUpForm = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const initialValues = {
        email: '',
        name: '',
        password: '',
        passwordCheck: '',
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
        <div className='modal-auth__sign-up'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
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
                            <ErrorMessage name='email' component='div' />
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
                            <ErrorMessage name='name' component='div' />
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
                            <ErrorMessage name='password' component='div' />
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
                            <ErrorMessage name='passwordCheck' component='div' />
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
        </div>
    )
}

export default SignUpForm