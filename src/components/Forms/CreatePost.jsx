import { ErrorMessage, Field, Form, Formik } from 'formik'
import './styles.scss'
import Button from '../Button'
import { addPosts } from '../../api/Firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthorizationModal, setCreatePostModal } from '../../store/modals/modals.action'
import { selectUser } from '../../store/user/user.selector'

const CreatePostForm = () => {
    const dispatch = useDispatch()

    const author = useSelector(selectUser)
    const initialValues = {
        title: '',
        subtitle: '',
        image: '',
        text: '',
    }
    const onSubmit = (values, { resetForm }) => {
        const { title, subtitle, image, text } = values
        addPosts(title, subtitle, image, text, author.email)
        resetForm()
        document.body.style.overflow = '';
        dispatch(setCreatePostModal(false))
    }
    const ask = () => {
        const confirmed = window.confirm('You need to authorization to create post!')
        if (confirmed) {
            dispatch(setCreatePostModal(false))
            dispatch(setAuthorizationModal(true))
        } else {
            document.body.style.overflow = '';
            window.history.back()
            dispatch(setCreatePostModal(false))
        }
    };
    if (!author) {
        ask()
    } else {
        return (
            <div className="create-post">
                <Formik initialValues={initialValues} onSubmit={onSubmit} >
                    <Form className="create-post__form" >
                        <div className="create-post__form-titles">
                            <label className="create-post__title title-up">Create Your Post, Onion!</label>
                            <label className="create-post__subtitle subtitle-up">Fill in all fields to  post your shity opinion!</label>
                        </div>
                        <div className="create-post__form-inputs">
                            <div className="create-post__form-wrap">
                                <label htmlFor="title"
                                    className="label"
                                >Title:</label>
                                <Field type='text' id='title' name='title'
                                    className="input input" />
                                <ErrorMessage name='title' component='div' className='errors' />
                            </div>
                            <div className="create-post__form-wrap">
                                <label htmlFor="subtitle"
                                    className="label"
                                >Subtitle:</label>
                                <Field type='text' id='subtitle' name='subtitle'
                                    className="input-s input" />
                                <ErrorMessage name='subtitle' component='div' className='errors' />
                            </div>
                            <div className="create-post__form-wrap">
                                <label htmlFor="image"
                                    className="label"
                                >Image URL:</label>
                                <Field type='text' id='image' name='image'
                                    className="input-i input" />
                                <ErrorMessage name='image' component='div' className='errors' />
                            </div>
                            <div className="create-post__form-wrap create-post__form-wrap-t">
                                <label htmlFor="text"
                                    className="label"
                                >Text:</label>
                                <Field type='text' id='text' name='text'
                                    as='textarea'
                                    className="input-t input" />
                                <ErrorMessage name='text' component='div' className='errors' />
                            </div>
                        </div>
                        <div className="create-post__form-buttons">
                            <Button type='submit'
                                buttonType='dark'
                                className='create-post__button-sub'>Submit</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
        )
    }
}

export default CreatePostForm