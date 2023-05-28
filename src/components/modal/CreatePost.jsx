import React, { useEffect, useState } from 'react'
import './styles.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setOpenPostModal } from '../../store/gallery/gallery.action'

const CreatePost = ({ url }) => {
  const [inpUrl, setInpUrl] = useState(url)
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    console.log('Params: ', params)
  }, [params])

  const closeModal = () => {
    document.body.style.overflow = '';
    dispatch(setOpenPostModal(false))
    navigate(-1)
  };

  return (
    <div className='bg-modal' onClick={closeModal}>
      <div className="modal-post" onClick={e => e.stopPropagation()}>
        <h3 className="modal-post__title title-up">Create Your Post</h3>
        <h4 className="modal-post__subtitle title-up">Fill in all fields to  post your shity opinion!</h4>
        <form className="modal-post__form" >
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
        <button className='modal-post__button' title='FILL ALL COLUMNS'>Submit</button>
      </div>
    </div>
  )
}

export default CreatePost