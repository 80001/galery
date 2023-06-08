import React from 'react'
import Button from '../Button'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { setCreatePostModal } from '../../store/modals/modals.action'

const CreatePostModal = () => {
  const dispatch = useDispatch()

  const input = document.getElementById('title');
  const label = document.querySelector('.modal-post__form-title');
  if (input) {
    input.addEventListener('focus', () => {
      label.style.transform = 'translateY(-100%)';
    });

    input.addEventListener('blur', () => {
      if (!input.value) {
        label.style.transform = 'translateX(100%)';
      }
    });
  }

  const closeModal = () => {
    document.body.style.overflow = '';
    dispatch(setCreatePostModal(false))
    let x = window.history.back()
    window.history.replaceState(null, '', x)
  }

  const initialValues = {
    title: '',
    subtitle: '',
    imageUrl: '',
    text: '',
  }
  const onSubmit = (values) => {
    console.log(values)
    values = initialValues
  }


  return (
    <div className='bg-modal' onClick={closeModal}>
      <div className="modal-post" onClick={e => e.stopPropagation()}>
        <Button className="modal-post__button-close"
          buttonType='white'
          onClick={closeModal}>Close</Button>
        <Formik initialValues={initialValues} onSubmit={onSubmit} >
          <Form className="modal-post__form" >
            <div className="modal-post__form-titles">
              <label className="modal-post__title title-up">Create Your Post, Onion!</label>
              <label className="modal-post__subtitle title-up">Fill in all fields to  post your shity opinion!</label>
            </div>
            <div className="modal-post__form-wrap">
              <label htmlFor="title"
                className="modal-post__form-title title-up"
              >Title:</label>
              <Field type='text' id='title' name='title'
                className="modal-post__input modal-post__form-title-input" />
              <ErrorMessage name='title' component='div' />
            </div>
            <div className="modal-post__form-wrap">
              <label htmlFor="subtitle"
                className="modal-post__form-subtitle title-up"
              >Subtitle:</label>
              <Field type='text' id='subtitle' name='subtitle'
                className="modal-post__input modal-post__form-subtitle-input" />
              <ErrorMessage name='subtitle' component='div' />
            </div>
            <div className="modal-post__form-wrap">
              <label htmlFor="image"
                className="modal-post__form-image title-up"
              >Image:</label>
              <Field type='text' id='image' name='image'
                className="modal-post__input modal-post__form-image-input" />
              <ErrorMessage name='image' component='div' />
            </div>
            <div className="modal-post__form-wrap">
              <label htmlFor="text"
                className="modal-post__form-text title-up"
              >Text:</label>
              <Field type='text' id='text' name='text'
                className="modal-post__input modal-post__form-text-input" />
              <ErrorMessage name='text' component='div' />
            </div>
            <Button type='submit'
              buttonType='dark'
              className='modal-post__button-sub'>Submit</Button>
          </Form>
        </Formik>
        {/*         <form className="modal-post__form" >
          <h5 className="modal-post__form-title title-up">Title:</h5>
          <input
            type="text"
            required
            name="title"
            className="modal-post__add-title"
            minLength={1}
            maxLength={100}
            placeholder="<=10 Symbols" />
          <h5 className="modal-post__form-title title-up">Subtitle:</h5>
          <input
            type="url"
            pattern="url"
            required
            name="subtitle"
            className="modal-post__add-subtitle"
            minLength={1}
            maxLength={100}
            placeholder="<=100 Symbols" />
          <h5 className="modal-post__form-title title-up">Image-Url:</h5>
          <input
            type="text"
            required
            name="img"
            id="img"
            minLength={10}
            className="modal-post__add-img"
            placeholder="URL" />
          <h5 className="modal-post__form-title title-up">Text:</h5>
          <input
            type="text"
            required
            name="text"
            className="modal-post__add-text"
            min={1}
            maxLength={5000}
            placeholder="<=5000 Symbols" />
        </form>
        <button className='modal-post__button' title='FILL ALL COLUMNS'>Submit</button> */}
      </div>
    </div>
  )
}

export default CreatePostModal