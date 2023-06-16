import React from 'react'
import Button from '../Button'

const EditPostForm = () => {
    const handleSubmit = () => {

    }
    return (
        <form className='changePost__form' onSubmit={handleSubmit}>
            <label htmlFor="title" className='changePost__form-label'>Title</label>
            <input type="text" name='title' className='changePost__form-input' />
            <label htmlFor="subtitle" className='changePost__form-label'>Subtitle</label>
            <input type="text" name='subtitle' className='changePost__form-input' />
            <label htmlFor="text" className='changePost__form-label'>Description</label>
            <textarea name="text" id="text" cols="30" rows="10" className='changePost__form-text'></textarea>
            <Button buttonType='white'>Submit</Button>
        </form>
    )
}

export default EditPostForm